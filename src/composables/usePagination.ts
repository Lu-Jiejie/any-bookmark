import { computed, ref } from 'vue'

export function usePagination<T>(items: () => T[], pageSize = 8) {
  const current = ref(1)

  const paged = computed(() => {
    const list = items()
    const start = (current.value - 1) * pageSize
    return list.slice(start, start + pageSize)
  })

  const total = computed(() => Math.ceil(items().length / pageSize))

  // reset page when items shrink below current page
  computed(() => {
    if (current.value > total.value && total.value > 0) {
      current.value = total.value
    }
  })

  return { current, paged, total }
}