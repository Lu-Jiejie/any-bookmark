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
