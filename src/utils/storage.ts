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

const DOMAIN_REGEX_KEY = 'any-bookmark-domain-regex'

export function loadDomainRegexes(): Record<string, string> {
  try {
    const raw = gmGetValue(DOMAIN_REGEX_KEY, '{}')
    return JSON.parse(raw)
  }
  catch {
    return {}
  }
}

export function saveDomainRegex(domain: string, pattern: string): void {
  const data = loadDomainRegexes()
  if (pattern)
    data[domain] = pattern
  else
    delete data[domain]
  gmSetValue(DOMAIN_REGEX_KEY, JSON.stringify(data))
}

export function getDomainRegex(domain: string): string | null {
  return loadDomainRegexes()[domain] || null
}

const LAST_SYNC_KEY = 'any-bookmark-last-sync-time'

export function loadLastSyncTime(): number {
  try {
    const raw = gmGetValue(LAST_SYNC_KEY, '0')
    return Number(raw) || 0
  }
  catch {
    return 0
  }
}

export function saveLastSyncTime(ts: number): void {
  gmSetValue(LAST_SYNC_KEY, String(ts))
}

interface SettingsExport {
  version: number
  bookmarks: Record<string, Bookmark[]>
  enabledDomains: string[]
  lastModified: Record<string, number>
  domainRegexes: Record<string, string>
}

const SETTINGS_VERSION = 2

/** 导出全部数据（收藏 + 域名 + 正则 + 时间戳）为格式化 JSON 字符串 */
export function exportAllData(): string {
  const data: SettingsExport = {
    version: SETTINGS_VERSION,
    bookmarks: loadBookmarks(),
    enabledDomains: loadEnabledDomains(),
    lastModified: loadLastModified(),
    domainRegexes: loadDomainRegexes(),
  }
  return JSON.stringify(data, null, 2)
}

// 保持旧函数名兼容油猴菜单
export { exportAllData as exportSettings }

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

  if (data.domainRegexes && typeof data.domainRegexes === 'object') {
    Object.entries(data.domainRegexes).forEach(([domain, pattern]) => {
      if (typeof pattern === 'string' && pattern)
        saveDomainRegex(domain, pattern)
    })
  }
}
