import type { Bookmark } from '../types'
import { GM_getValue, GM_setValue } from '$'

const STORAGE_KEY = 'any-bookmark-data'
const ENABLED_DOMAINS_KEY = 'any-bookmark-enabled-domains'

function gmGetValue(key: string, defaultValue: string): string {
  if (typeof GM_getValue !== 'undefined') {
    return GM_getValue(key, defaultValue) as string
  }
  return localStorage.getItem(key) ?? defaultValue
}

function gmSetValue(key: string, value: string): void {
  if (typeof GM_setValue !== 'undefined') {
    GM_setValue(key, value)
    return
  }
  localStorage.setItem(key, value)
}

export function loadBookmarks(): Record<string, Bookmark[]> {
  try {
    const raw = gmGetValue(STORAGE_KEY, '{}')
    return JSON.parse(raw)
  }
  catch {
    return {}
  }
}

export function saveBookmarks(data: Record<string, Bookmark[]>): void {
  gmSetValue(STORAGE_KEY, JSON.stringify(data))
}

export function loadEnabledDomains(): string[] {
  try {
    const parsed = JSON.parse(gmGetValue(ENABLED_DOMAINS_KEY, '[]'))
    return Array.isArray(parsed) ? parsed : []
  }
  catch {
    return []
  }
}

export function saveEnabledDomains(domains: string[]): void {
  gmSetValue(ENABLED_DOMAINS_KEY, JSON.stringify(domains))
}

const LAST_MODIFIED_KEY = 'any-bookmark-last-modified'

export function loadLastModified(): Record<string, number> {
  try {
    const raw = gmGetValue(LAST_MODIFIED_KEY, '{}')
    return JSON.parse(raw)
  }
  catch {
    return {}
  }
}

export function saveLastModified(data: Record<string, number>): void {
  gmSetValue(LAST_MODIFIED_KEY, JSON.stringify(data))
}

/** 记录指定域名的最后修改时间戳，用于多设备冲突解决 */
export function touchDomain(domain: string): void {
  const data = loadLastModified()
  data[domain] = Date.now()
  saveLastModified(data)
}

interface SettingsExport {
  version: number
  bookmarks: Record<string, Bookmark[]>
  enabledDomains: string[]
  lastModified: Record<string, number>
}

const SETTINGS_VERSION = 2

/** 导出完整设置（书签 + 启用域名 + 时间戳）为格式化 JSON 字符串 */
export function exportSettings(): string {
  const data: SettingsExport = {
    version: SETTINGS_VERSION,
    bookmarks: loadBookmarks(),
    enabledDomains: loadEnabledDomains(),
    lastModified: loadLastModified(),
  }
  return JSON.stringify(data, null, 2)
}

/** 从 JSON 字符串导入设置，格式非法时抛出错误 */
export function importSettings(json: string): void {
  const data = JSON.parse(json)
  if (!data || typeof data !== 'object')
    throw new TypeError('无效的设置文件')

  if (data.bookmarks && typeof data.bookmarks === 'object')
    saveBookmarks(data.bookmarks)

  if (Array.isArray(data.enabledDomains))
    saveEnabledDomains(data.enabledDomains)

  if (data.lastModified && typeof data.lastModified === 'object')
    saveLastModified(data.lastModified)
}
