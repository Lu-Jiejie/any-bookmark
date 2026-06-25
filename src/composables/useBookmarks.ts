import type { Bookmark } from '../types'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { loadBookmarks, saveBookmarks, touchDomain } from '../utils/storage'

export function useBookmarks() {
  const allBookmarks = ref<Record<string, Bookmark[]>>(loadBookmarks())

  const hostname = computed(() => {
    try {
      return new URL(location.href).hostname
    }
    catch {
      return location.hostname
    }
  })

  const currentBookmarks = computed(() =>
    allBookmarks.value[hostname.value] ?? [],
  )

  // 同步模块写入 GM_setValue 后通过事件通知，重新加载数据以保持 UI 一致
  // 标记外部变更以阻止 watch 再次派发 local-changed，避免 sync -> push -> 循环
  let isExternalChange = false

  function onExternalChange() {
    isExternalChange = true
    allBookmarks.value = loadBookmarks()
    nextTick(() => {
      isExternalChange = false
    })
  }
  onMounted(() => window.addEventListener('any-bookmark:data-changed', onExternalChange))
  onUnmounted(() => window.removeEventListener('any-bookmark:data-changed', onExternalChange))

  // persist on change
  watch(allBookmarks, (val) => {
    saveBookmarks(val)
    if (!isExternalChange) {
      window.dispatchEvent(new CustomEvent('any-bookmark:local-changed'))
    }
  }, { deep: true })

  function add(name: string) {
    const trimmed = name.trim()
    if (!trimmed)
      return

    const entry: Bookmark = { name: trimmed, url: location.href }
    const data = { ...allBookmarks.value }
    if (!data[hostname.value]) {
      data[hostname.value] = []
    }
    data[hostname.value] = [entry, ...data[hostname.value]]
    allBookmarks.value = data
    touchDomain(hostname.value)
  }

  function remove(index: number) {
    const data = { ...allBookmarks.value }
    data[hostname.value].splice(index, 1)
    if (data[hostname.value].length === 0) {
      delete data[hostname.value]
    }
    allBookmarks.value = data
    touchDomain(hostname.value)
  }

  return { allBookmarks, hostname, currentBookmarks, add, remove }
}
