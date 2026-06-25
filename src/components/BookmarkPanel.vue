<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import { useBookmarks } from '../composables/useBookmarks'
import { usePagination } from '../composables/usePagination'
import Pagination from './Pagination.vue'
import SyncSettings from './SyncSettings.vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const currentView = ref<'bookmarks' | 'settings'>('bookmarks')

const PAGE_SIZE = 10

const isLocked = useScrollLock(document.body)

watch(() => props.open, (val) => {
  isLocked.value = val
}, { immediate: true })

const { hostname, currentBookmarks, add, remove } = useBookmarks()
const { current, paged, total } = usePagination(() => currentBookmarks.value, PAGE_SIZE)

const newName = ref('')
const inputRef = ref<HTMLInputElement>()
// const listRef = ref<HTMLDivElement>()

const hasNewName = computed(() => newName.value.trim().length > 0)

const emptyRowsCount = computed(() => {
  return PAGE_SIZE - paged.value.length
})

const STORAGE_KEY = 'bookmark-current-page'

watch(current, (val) => {
  localStorage.setItem(STORAGE_KEY, String(val))
})

watch(() => props.open, (val) => {
  if (val) {
    currentView.value = 'bookmarks'
    newName.value = document.title || ''
    const savedPage = localStorage.getItem(STORAGE_KEY)
    const targetPage = savedPage ? Number(savedPage) : 1

    nextTick(() => {
      const maxPage = total.value || 1
      current.value = Math.min(targetPage, maxPage)
      inputRef.value?.focus()
    })
  }
})

function handleAdd() {
  add(newName.value)
  newName.value = ''
  current.value = 1
}

function handleRemove(index: number) {
  const realIndex = (current.value - 1) * PAGE_SIZE + index
  remove(realIndex)
}
</script>

<template>
  <Transition
    enter-active-class="duration-200 ease-out"
    leave-active-class="duration-150 ease-in"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      flex items-center inset-0 justify-center fixed z-999999 print:hidden
    >
      <div
        bg-black op-60 inset-0 absolute z-0
        @click="emit('close')"
      />

      <div
        max-w="[95vw]" flex="~ col"
        border="1 solid border"
        rounded-2xl bg-panel w-130 relative z-1 overflow-hidden
        p="x-4 y-3"
      >
        <div flex="~ items-center justify-between" mb-3>
          <div flex gap-2.5 items-center>
            <div i-mdi-bookmark-outline text-lg text-accent />
            <span text-base text-white tracking-wider font-bold font-serif>收藏夹</span>
          </div>

          <div flex gap-3 items-center>
            <span text="#a6926d" text-xs font-mono>{{ hostname }}</span>
            <button
              text-white p-0.5 border-none bg-transparent op-40 cursor-pointer transition-colors duration-200 hover:op-90
              @click="currentView = 'settings'"
            >
              <div i-mdi-cog text-lg />
            </button>
            <button
              text-white p-0.5 border-none bg-transparent op-40 cursor-pointer transition-colors duration-200 hover:op-90
              @click="emit('close')"
            >
              <div i-mdi-close text-lg />
            </button>
          </div>
        </div>

        <!-- Bookmarks view -->
        <template v-if="currentView === 'bookmarks'">
          <div mb-3 h-px to-transparent bg-gradient-to-r from="[var(--border-dark)]" via="[var(--c-accent)]" />

          <div flex="~  gap-2" mb-3>
            <input
              ref="inputRef"
              v-model="newName"
              type="text"
              placeholder="为当前页面命名…"
              border="1 solid border focus:border-accent"
              p="x-3 y-2"
              text="sm white/90! placeholder-white/40!"
              outline-none rounded-lg flex-1 transition-200 important-bg-input
              @keydown.enter="handleAdd()"
            >

            <button
              p="x-3 y-2"
              border="1 solid border-accent rounded-lg"
              flex="~ gap-1" text-sm bg-input cursor-pointer transition-200
              :class="{
                'border-border! cursor-not-allowed text-white/40': !hasNewName,
                'bg-accent/10! text-accent/90 hover:bg-accent! hover:text-white/90': hasNewName,
              }"
              :disabled="!hasNewName"
              @click="handleAdd()"
            >
              <span>收藏</span>
            </button>
          </div>

          <div flex="~ col gap-1" p-1 border="1 solid border rounded-lg">
            <div
              v-for="(bm, i) in paged"
              :key="`${current}-${i}`"
              border="1 solid transparent hover:border-accent"
              flex="~ items-center" px-3 rounded-lg bg-input transition-250
              class="group"
            >
              <a
                :href="bm.url"
                :title="bm.url"
                un-text="sm white/90!" font-sans py-2.5 op-80 no-underline flex flex-1 min-w-0 items-center
                class="transition-all duration-200 group-hover:op-100 group-hover:text-[var(--c-accent)]!"
              >
                <span class="truncate">{{ bm.name }}</span>
              </a>

              <button
                text-white ml-2 p-1 border-none bg-transparent op-30 flex shrink-0 cursor-pointer items-center
                class="transition-all duration-200 relative z-2 hover:text-red-400! hover:op-100!"
                @click="handleRemove(i)"
              >
                <div i-mdi-delete-outline text-sm />
              </button>
            </div>

            <div
              v-for="n in emptyRowsCount"
              :key="`empty-${n}`"
              border="1 solid transparent"
              px-3 py-2.5 bg-transparent flex pointer-events-none select-none items-center
            >
              <span text-sm op-0>&nbsp;</span>
            </div>
          </div>

          <Pagination
            v-model:current="current"
            :total="total"
          />
        </template>

        <!-- Settings view -->
        <SyncSettings
          v-if="currentView === 'settings'"
          @back="currentView = 'bookmarks'"
        />
      </div>
    </div>
  </Transition>
</template>
