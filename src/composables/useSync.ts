import type { SyncConfig } from '../utils/sync'
import { readonly, ref } from 'vue'
import { saveBookmarks, saveEnabledDomains } from '../utils/storage'
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

const status = ref<SyncStatus>('not_configured')
const lastSyncTime = ref<Date | null>(null)
const error = ref<string | null>(null)

let pollTimer: ReturnType<typeof setInterval> | null = null

export function useSync() {
  // 用 ref 而非 computed，因为 getSyncConfig() 读的是 GM 存储，
  // Vue 无法追踪其变化，需要手动维护。
  const isConfigured = ref(getSyncConfig() !== null)

  if (isConfigured.value && status.value === 'not_configured') {
    status.value = 'idle'
  }

  function setStatus(s: SyncStatus) {
    status.value = s
    if (s !== 'error')
      error.value = null
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
      lastSyncTime.value = new Date()
      setStatus('idle')
    }
    catch (e) {
      setStatus('error')
      error.value = e instanceof Error ? e.message : '同步失败'
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
      lastSyncTime.value = new Date()
      setStatus('idle')
    }
    catch (e) {
      setStatus('error')
      error.value = e instanceof Error ? e.message : '同步失败'
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
      lastSyncTime.value = new Date()
      setStatus('idle')
      startAutoSync(60000)
    }
    catch (e) {
      setStatus('error')
      error.value = e instanceof Error ? e.message : '配置失败'
      throw e
    }
  }

  function disconnectSync(): void {
    clearSyncConfig()
    isConfigured.value = false
    stopAutoSync()
    setStatus('not_configured')
    lastSyncTime.value = null
  }

  function startAutoSync(intervalMs: number = 60000): void {
    stopAutoSync()
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
    startAutoSync,
    stopAutoSync,
  }
}
