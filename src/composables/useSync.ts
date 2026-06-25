import type { SyncConfig } from '../utils/sync'
import { readonly, ref } from 'vue'
import { loadLastSyncTime, saveBookmarks, saveEnabledDomains, saveLastSyncTime } from '../utils/storage'
import {
  clearSyncConfig,
  getSyncConfig,
  loadAllData,
  mergeData,
  pull,
  push,
  saveSyncConfig,
} from '../utils/sync'

export type SyncStatus = 'not_configured' | 'idle' | 'syncing' | 'error'

const SYNC_INTERVAL = 300000 // 5 分钟
const MAX_RETRY_DELAY = 60000 // 最大重试间隔 1 分钟

const status = ref<SyncStatus>('not_configured')
const lastSyncTime = ref<Date | null>(null)
const error = ref<string | null>(null)

let pollTimer: ReturnType<typeof setInterval> | null = null
let retryTimer: ReturnType<typeof setTimeout> | null = null
let retryCount = 0

export function shouldPullOnStartup(): boolean {
  const last = loadLastSyncTime()
  if (!last)
    return true
  return Date.now() - last > SYNC_INTERVAL
}

export function useSync() {
  const isConfigured = ref(getSyncConfig() !== null)

  if (isConfigured.value && status.value === 'not_configured') {
    status.value = 'idle'
  }

  function setStatus(s: SyncStatus) {
    status.value = s
    if (s !== 'error')
      error.value = null
  }

  function markSynced() {
    const now = new Date()
    lastSyncTime.value = now
    saveLastSyncTime(now.getTime())
    retryCount = 0
    clearRetry()
  }

  function clearRetry() {
    if (retryTimer !== null) {
      clearTimeout(retryTimer)
      retryTimer = null
    }
  }

  function scheduleRetry(fn: () => Promise<void>) {
    clearRetry()
    const delay = Math.min(1000 * (2 ** retryCount), MAX_RETRY_DELAY)
    retryCount++
    retryTimer = setTimeout(async () => {
      try {
        await fn()
        setStatus('idle')
        markSynced()
      }
      catch {
        scheduleRetry(fn)
      }
    }, delay)
  }

  function applyData(merged: { bookmarks: any, enabledDomains: string[] }) {
    saveBookmarks(merged.bookmarks)
    saveEnabledDomains(merged.enabledDomains)
    window.dispatchEvent(new CustomEvent('any-bookmark:data-changed'))
  }

  /** 拉取远程并合并到本地，不推送本地变更 */
  async function pullAndMerge(): Promise<void> {
    if (status.value === 'syncing')
      return
    const config = getSyncConfig()
    if (!config)
      return

    setStatus('syncing')
    try {
      const remote = await pull(config)
      if (remote) {
        const local = loadAllData()
        const merged = mergeData(local, remote)
        applyData(merged)
      }
      markSynced()
      setStatus('idle')
    }
    catch (e) {
      setStatus('error')
      error.value = e instanceof Error ? e.message : '同步失败'
      scheduleRetry(pullAndMerge)
      throw e
    }
  }

  /** 完整同步：拉取 → 合并 → 推送 */
  async function doSync(silent = false): Promise<void> {
    if (status.value === 'syncing')
      return
    const config = getSyncConfig()
    if (!config)
      return

    setStatus('syncing')
    try {
      const remote = await pull(config)
      const local = loadAllData()
      const merged = remote ? mergeData(local, remote) : local

      await push(config, merged)
      applyData(merged)
      markSynced()
      setStatus('idle')
    }
    catch (e) {
      setStatus('error')
      error.value = e instanceof Error ? e.message : '同步失败'
      scheduleRetry(() => doSync(true))
      if (!silent)
        throw e
    }
  }

  /** 首次配置：尝试拉取已有数据，否则推送本地 */
  async function setupSync(config: SyncConfig): Promise<void> {
    saveSyncConfig(config)
    isConfigured.value = true
    setStatus('syncing')
    try {
      const remote = await pull(config)
      if (remote) {
        const local = loadAllData()
        const merged = mergeData(local, remote)
        applyData(merged)
      }
      else {
        await push(config, loadAllData())
      }
      markSynced()
      setStatus('idle')
      startAutoSync()
    }
    catch (e) {
      setStatus('error')
      error.value = e instanceof Error ? e.message : '配置失败'
      scheduleRetry(() => setupSync(config))
      throw e
    }
  }

  const autoSyncEnabled = ref(false)

  function disconnectSync(): void {
    clearSyncConfig()
    isConfigured.value = false
    autoSyncEnabled.value = false
    stopAutoSync()
    clearRetry()
    setStatus('not_configured')
    lastSyncTime.value = null
  }

  function toggleAutoSync(): void {
    if (autoSyncEnabled.value) {
      stopAutoSync()
      autoSyncEnabled.value = false
    }
    else {
      startAutoSync()
      autoSyncEnabled.value = true
    }
  }

  function startAutoSync(intervalMs: number = SYNC_INTERVAL): void {
    stopAutoSync()
    autoSyncEnabled.value = true
    pollTimer = setInterval(async () => {
      if (status.value === 'syncing')
        return
      try {
        await pullAndMerge()
      }
      catch {
        // 轮询静默失败，不影响用户
      }
    }, intervalMs)
  }

  function stopAutoSync(): void {
    if (pollTimer !== null) {
      clearInterval(pollTimer)
      pollTimer = null
    }
  }

  return {
    status: readonly(status),
    lastSyncTime: readonly(lastSyncTime),
    error: readonly(error),
    isConfigured,
    pullAndMerge,
    sync: doSync,
    setupSync,
    disconnectSync,
    toggleAutoSync,
    autoSyncEnabled: readonly(autoSyncEnabled),
    startAutoSync,
    stopAutoSync,
  }
}
