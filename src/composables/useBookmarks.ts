import type { Bookmark } from '../types'
import { computed, ref, watch } from 'vue'
import { loadBookmarks, saveBookmarks } from '../utils/storage'

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

  // persist on change
  watch(allBookmarks, saveBookmarks, { deep: true })

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
  }

  function remove(index: number) {
    const data = { ...allBookmarks.value }
    data[hostname.value].splice(index, 1)
    if (data[hostname.value].length === 0) {
      delete data[hostname.value]
    }
    allBookmarks.value = data
  }

  return { allBookmarks, hostname, currentBookmarks, add, remove }
}
