<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  total: number
}>()

const current = defineModel<number>('current', { required: true })

const visiblePages = computed(() => {
  const t = props.total
  if (t <= 0)
    return []

  const c = current.value
  const pages: (number | string)[] = []

  if (t <= 5) {
    for (let i = 1; i <= t; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  let start = Math.max(2, c - 1)
  let end = Math.min(t - 1, c + 1)

  if (c <= 3) {
    start = 2
    end = 4
  }
  else if (c >= t - 2) {
    start = t - 3
    end = t - 1
  }

  if (start > 2) {
    pages.push('...')
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < t - 1) {
    pages.push('...')
  }

  pages.push(t)
  return pages
})
</script>

<template>
  <div p="x-4 t-3" flex="~ gap-1 items-center justify-center">
    <button
      hover:text-accent text-white p-1 border-none bg-transparent op-40 flex cursor-pointer transition-colors duration-200 items-center hover:op-100
      :disabled="current === 1 || total <= 1"
      :class="{ 'opacity-10! cursor-not-allowed hover:text-white': current === 1 || total <= 1 }"
      @click="current--"
    >
      <div i-mdi-chevron-left text-sm />
    </button>

    <template v-if="total === 0">
      <button
        text-accent text-sm font-bold font-mono border-none bg-transparent flex h-6 w-6 items-center justify-center
      >
        1
      </button>
    </template>
    <template v-else>
      <template v-for="(p, idx) in visiblePages" :key="idx">
        <span
          v-if="p === '...'"
          text-sm text-white font-mono op-20 flex size-6 select-none items-center justify-center
        >
          ...
        </span>
        <button
          v-else
          text-sm font-mono border-none flex size-6 transition-all duration-200 items-center justify-center
          :class="p === current
            ? 'bg-transparent text-accent font-bold! '
            : 'bg-transparent text-white op-40 hover:text-white hover:op-80 cursor-pointer'"
          :disabled="p === current"
          @click="current = p as number"
        >
          {{ p }}
        </button>
      </template>
    </template>

    <button
      hover:text-accent text-white p-1 border-none bg-transparent op-40 flex cursor-pointer transition-colors duration-200 items-center hover:op-100
      :disabled="current === total || total <= 1"
      :class="{ 'opacity-10! cursor-not-allowed hover:text-white': current === total || total <= 1 }"
      @click="current++"
    >
      <div i-mdi-chevron-right text-sm />
    </button>
  </div>
</template>
