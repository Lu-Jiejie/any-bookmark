import { GM_registerMenuCommand } from '$'
import { computed, ref, watch } from 'vue'
import {
  exportSettings,
  importSettings,
  loadEnabledDomains,
  loadLastModified,
  saveEnabledDomains,
  saveLastModified,
} from '../utils/storage'

const currentDomain = location.hostname

const enabledDomains = ref<string[]>(loadEnabledDomains())

/** 当前域名是否应展示收藏按钮，默认禁用 */
export const currentDomainEnabled = computed(
  () => enabledDomains.value.includes(currentDomain),
)

/** 所有已启用的域名（响应式，供设置面板使用） */
export { enabledDomains }

/** 从已启用列表中移除一个域名并持久化 */
export function removeEnabledDomain(domain: string): void {
  enabledDomains.value = enabledDomains.value.filter(d => d !== domain)
  saveEnabledDomains(enabledDomains.value)
  const timestamps = loadLastModified()
  timestamps.__enabled__ = Date.now()
  saveLastModified(timestamps)
}

function toggleCurrentDomain() {
  const next = new Set(enabledDomains.value)
  if (next.has(currentDomain))
    next.delete(currentDomain)
  else
    next.add(currentDomain)

  enabledDomains.value = [...next]
  saveEnabledDomains(enabledDomains.value)
  // 更新 enabledDomains 时间戳，用于多设备冲突解决
  const timestamps = loadLastModified()
  timestamps.__enabled__ = Date.now()
  saveLastModified(timestamps)
}

let initialized = false

// 固定菜单 id：重复注册会替换原项而非新增，避免 toggle/HMR 产生重复菜单
const TOGGLE_MENU_ID = 'any-bookmark-toggle-domain'
const EXPORT_MENU_ID = 'any-bookmark-export'
const IMPORT_MENU_ID = 'any-bookmark-import'

function registerMenu() {
  // 只要油猴提供了菜单 API 就注册（dev 在 Tampermonkey 下同样可用）
  if (typeof GM_registerMenuCommand !== 'function')
    return

  const enabled = enabledDomains.value.includes(currentDomain)
  const label = enabled
    ? `在 ${currentDomain} 隐藏收藏按钮`
    : `在 ${currentDomain} 显示收藏按钮`

  GM_registerMenuCommand(label, () => toggleCurrentDomain(), { id: TOGGLE_MENU_ID })
}

/** 导出完整设置为 JSON 文件下载 */
function downloadSettings() {
  const blob = new Blob([exportSettings()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `any-bookmark-settings-${new Date().toISOString().slice(0, 10)}.json`
  document.body.append(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/** 粘贴 JSON 并导入设置，成功后刷新页面以应用 */
function promptImportSettings() {
  // 油猴菜单点击不会向页面传递用户激活，无法打开文件选择框，
  // 改用 prompt 粘贴（对话框不依赖用户激活）
  // eslint-disable-next-line no-alert
  const json = prompt('粘贴导出的设置 JSON：')
  if (!json)
    return
  try {
    importSettings(json)
    location.reload()
  }
  catch {
    // eslint-disable-next-line no-alert
    alert('导入失败：JSON 格式无效')
  }
}

/** 在应用启动时调用一次，注册油猴菜单并保持其文案与开关状态同步 */
export function setupSettings() {
  if (initialized)
    return
  initialized = true

  registerMenu()

  if (typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand('导出书签设置', () => downloadSettings(), { id: EXPORT_MENU_ID })
    GM_registerMenuCommand('导入书签设置', () => promptImportSettings(), { id: IMPORT_MENU_ID })
  }

  // 状态变化后重新注册开关菜单项，更新「显示/隐藏」文案
  watch(currentDomainEnabled, registerMenu)
}
