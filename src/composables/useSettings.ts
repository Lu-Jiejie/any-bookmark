import { GM_registerMenuCommand, GM_unregisterMenuCommand } from '$'
import { computed, ref, watch } from 'vue'
import { loadEnabledDomains, saveEnabledDomains } from '../utils/storage'

const currentDomain = location.hostname

// 非油猴环境（如本地 dev）下无菜单可用，直接放行以便开发调试
const isUserscript = typeof GM_registerMenuCommand !== 'undefined'

const enabledDomains = ref<string[]>(loadEnabledDomains())

/** 当前域名是否应展示书签按钮，默认禁用 */
export const currentDomainEnabled = computed(
  () => !isUserscript || enabledDomains.value.includes(currentDomain),
)

function toggleCurrentDomain() {
  const next = new Set(enabledDomains.value)
  if (next.has(currentDomain))
    next.delete(currentDomain)
  else
    next.add(currentDomain)

  enabledDomains.value = [...next]
  saveEnabledDomains(enabledDomains.value)
}

let menuId: number | string | undefined
let initialized = false

function registerMenu() {
  if (!isUserscript)
    return

  const enabled = enabledDomains.value.includes(currentDomain)
  const label = enabled
    ? `在 ${currentDomain} 隐藏书签按钮`
    : `在 ${currentDomain} 显示书签按钮`

  if (menuId !== undefined && typeof GM_unregisterMenuCommand !== 'undefined')
    GM_unregisterMenuCommand(menuId)

  menuId = GM_registerMenuCommand(label, () => toggleCurrentDomain())
}

/** 在应用启动时调用一次，注册油猴菜单并保持其文案与开关状态同步 */
export function setupSettings() {
  if (initialized)
    return
  initialized = true

  registerMenu()
  // 状态变化后重新注册菜单项，更新「显示/隐藏」文案
  watch(currentDomainEnabled, registerMenu)
}
