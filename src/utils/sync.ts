import type { Bookmark } from '../types'
import { GM_getValue, GM_setValue, GM_xmlhttpRequest } from '$'
import { loadBookmarks, loadEnabledDomains, loadLastModified } from './storage'

export interface SyncConfig {
  /** WebDAV 目录地址，脚本会在该目录下自动管理 any-bookmark.json */
  url: string
  username: string
  password: string
}

const SYNC_DATA_VERSION = 2

export interface SyncData {
  version: number
  bookmarks: Record<string, Bookmark[]>
  enabledDomains: string[]
  /** 每个域名的最后修改时间戳，用于多设备冲突解决 */
  lastModified: Record<string, number>
}

const DATA_FILENAME = 'any-bookmark.json'

function getFileUrl(config: SyncConfig): string {
  const base = config.url.replace(/\/+$/, '')
  return `${base}/${DATA_FILENAME}`
}

const SYNC_CONFIG_KEY = 'any-bookmark-sync-config'

export function getSyncConfig(): SyncConfig | null {
  if (typeof GM_getValue === 'undefined')
    return null
  try {
    const raw = GM_getValue(SYNC_CONFIG_KEY, '')
    return raw ? JSON.parse(raw) : null
  }
  catch {
    return null
  }
}

export function saveSyncConfig(config: SyncConfig): void {
  if (typeof GM_setValue === 'undefined')
    return
  GM_setValue(SYNC_CONFIG_KEY, JSON.stringify(config))
}

export function clearSyncConfig(): void {
  if (typeof GM_setValue === 'undefined')
    return
  GM_setValue(SYNC_CONFIG_KEY, '')
}

function basicAuth(config: SyncConfig): string {
  const str = `${config.username}:${config.password}`
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)
  let binary = ''
  for (let i = 0; i < bytes.length; i++)
    binary += String.fromCharCode(bytes[i])
  return `Basic ${btoa(binary)}`
}

interface RequestResult {
  status: number
  body: string
  lastModified: string | null
}

function request(
  method: 'GET' | 'PUT',
  config: SyncConfig,
  body?: string,
): Promise<RequestResult> {
  return new Promise((resolve, reject) => {
    if (typeof GM_xmlhttpRequest === 'undefined') {
      reject(new Error('GM_xmlhttpRequest 不可用，请在 Tampermonkey 中运行'))
      return
    }

    const headers: Record<string, string> = {
      Authorization: basicAuth(config),
      Accept: 'application/json',
    }
    if (body)
      headers['Content-Type'] = 'application/json; charset=utf-8'

    GM_xmlhttpRequest({
      method,
      url: getFileUrl(config),
      headers,
      data: body || undefined,
      timeout: 15000,
      onload(resp) {
        let lastModified: string | null = null
        const rawHeaders = resp.responseHeaders || ''
        const match = rawHeaders.match(/last-modified:\s*(.+)/i)
        if (match)
          lastModified = match[1]

        resolve({
          status: resp.status,
          body: resp.responseText || '',
          lastModified,
        })
      },
      onerror(err) {
        reject(new Error(`请求失败: ${err || '未知错误'}`))
      },
      ontimeout() {
        reject(new Error('请求超时'))
      },
    })
  })
}

export async function pull(config: SyncConfig): Promise<SyncData | null> {
  const result = await request('GET', config)
  if (result.status === 404) {
    return null
  }
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`下载失败 (HTTP ${result.status})`)
  }
  if (!result.body || !result.body.trim()) {
    return null
  }
  try {
    const data = JSON.parse(result.body)
    // 兼容旧格式（无 version 字段或 version < 2）
    return {
      version: SYNC_DATA_VERSION,
      bookmarks: data.bookmarks || {},
      enabledDomains: data.enabledDomains || [],
      lastModified: data.lastModified || {},
    }
  }
  catch {
    throw new Error('远程数据格式错误，无法解析 JSON')
  }
}

export async function push(config: SyncConfig, data: SyncData): Promise<void> {
  const json = JSON.stringify(data, null, 2)
  const result = await request('PUT', config, json)
  if (result.status >= 400) {
    throw new Error(`上传失败 (HTTP ${result.status})`)
  }
}

/**
 * 逐域名按时间戳合并。
 * - 本地较新或相同时保留本地（删除亦生效——本地删了域名则 merged 不含该域名）。
 * - 远程较新时采用远程。
 * - 仅存在于一方的保留。
 */
export function mergeData(local: SyncData, remote: SyncData): SyncData {
  const mergedBookmarks: Record<string, Bookmark[]> = {}
  const mergedTimestamps: Record<string, number> = {}

  const allDomains = new Set([
    ...Object.keys(local.bookmarks),
    ...Object.keys(remote.bookmarks),
  ])

  for (const domain of allDomains) {
    const localTime = local.lastModified[domain] ?? 0
    const remoteTime = remote.lastModified[domain] ?? 0

    if (localTime >= remoteTime) {
      if (local.bookmarks[domain]?.length) {
        mergedBookmarks[domain] = local.bookmarks[domain]
        mergedTimestamps[domain] = localTime
      }
      // 否则本地已删除（空数组或不存在），不保留
    }
    else {
      if (remote.bookmarks[domain]?.length) {
        mergedBookmarks[domain] = remote.bookmarks[domain]
        mergedTimestamps[domain] = remoteTime
      }
    }
  }

  // enabledDomains 同理用特殊键 __enabled__ 的时间戳
  const enabledKey = '__enabled__'
  const localEnabledTime = local.lastModified[enabledKey] ?? 0
  const remoteEnabledTime = remote.lastModified[enabledKey] ?? 0

  const mergedEnabled = localEnabledTime >= remoteEnabledTime
    ? local.enabledDomains
    : remote.enabledDomains
  mergedTimestamps[enabledKey] = Math.max(localEnabledTime, remoteEnabledTime)

  return {
    version: SYNC_DATA_VERSION,
    bookmarks: mergedBookmarks,
    enabledDomains: mergedEnabled,
    lastModified: mergedTimestamps,
  }
}

export function loadAllData(): SyncData {
  return {
    version: SYNC_DATA_VERSION,
    bookmarks: loadBookmarks(),
    enabledDomains: loadEnabledDomains(),
    lastModified: loadLastModified(),
  }
}
