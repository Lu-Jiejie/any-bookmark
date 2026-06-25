<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import { useBookmarks } from '../composables/useBookmarks'
import { usePagination } from '../composables/usePagination'
import { getDomainRegex, saveDomainRegex } from '../utils/storage'
import Pagination from './Pagination.vue'
import SettingsPage from './SettingsPage.vue'
import BaseButton from './ui/BaseButton.vue'
import BaseInput from './ui/BaseInput.vue'

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

const { hostname, currentBookmarks, add, remove, updateName } = useBookmarks()

// Search
const searchQuery = ref('')
const filteredBookmarks = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q)
    return currentBookmarks.value
  return currentBookmarks.value.filter(b => b.name.toLowerCase().includes(q))
})

const { current, paged, total } = usePagination(() => filteredBookmarks.value, PAGE_SIZE)

// Add form
const showAddForm = ref(false)
const newName = ref('')
const inputRef = ref<InstanceType<typeof BaseInput>>()

const hasNewName = computed(() => newName.value.trim().length > 0)

const domainRegex = computed(() => getDomainRegex(hostname.value))

// Edit via browser prompt
function startEdit(index: number, name: string) {
  // eslint-disable-next-line no-alert
  const result = prompt('编辑书签名称', name)
  if (result && result.trim()) {
    const realIndex = (current.value - 1) * PAGE_SIZE + index
    updateName(realIndex, result.trim())
  }
}

// Empty rows
const emptyRowsCount = computed(() => {
  return PAGE_SIZE - paged.value.length
})

// Persist page
const STORAGE_KEY = 'bookmark-current-page'
watch(current, (val) => {
  localStorage.setItem(STORAGE_KEY, String(val))
})

// Reset on open
watch(() => props.open, (val) => {
  if (val) {
    currentView.value = 'bookmarks'
    showAddForm.value = false
    searchQuery.value = ''
    newName.value = document.title || ''
    const savedPage = localStorage.getItem(STORAGE_KEY)
    const targetPage = savedPage ? Number(savedPage) : 1

    nextTick(() => {
      const maxPage = Math.max(total.value, 1)
      current.value = Math.min(targetPage, maxPage)
      // Don't auto-focus when collapsed
    })
  }
})

// Reset page when search/filter changes
watch([searchQuery, filteredBookmarks], () => {
  current.value = 1
})

function handleAdd() {
  add(newName.value)
  newName.value = ''
  searchQuery.value = ''
  current.value = 1
  inputRef.value?.focus()
}

function handleRemove(index: number) {
  const realIndex = (current.value - 1) * PAGE_SIZE + index
  remove(realIndex)
  // If we deleted the last item on the page, go to previous page
  if (paged.value.length === 0 && current.value > 1) {
    current.value--
  }
}

function fillOriginalTitle() {
  newName.value = document.title || ''
  inputRef.value?.focus()
}

function applyRegex() {
  const pattern = domainRegex.value
  if (!pattern)
    return
  try {
    const re = new RegExp(pattern)
    const title = document.title || ''
    const match = title.match(re)
    // 有捕获组则取第一个组，否则取完整匹配
    newName.value = match ? (match[1] ?? match[0]) : title
  }
  catch {
    // 无效正则，忽略
  }
  inputRef.value?.focus()
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
        @keydown.stop @keyup.stop
      >
        <!-- Header -->
        <div flex="~ items-center justify-between" mb-3>
          <div flex gap-2.5 items-center>
            <div i-mdi-bookmark-outline text-lg text-accent />
            <span text-base text-white tracking-wider font-bold font-serif>收藏夹</span>
          </div>

          <div flex gap-3 items-center>
            <span text="#a6926d" text-xs font-mono>{{ hostname }}</span>
            <BaseButton variant="ghost" title="设置" @click="currentView = 'settings'">
              <div i-mdi-cog text-lg />
            </BaseButton>
            <BaseButton variant="ghost" @click="emit('close')">
              <div i-mdi-close text-lg />
            </BaseButton>
          </div>
        </div>

        <div mb-3 h-px to-transparent bg-gradient-to-r from="[var(--border-dark)]" via="[var(--c-accent)]" />

        <!-- Bookmarks view -->
        <template v-if="currentView === 'bookmarks'">
          <!-- Toolbar: search + toggle add -->
          <div flex="~ gap-2" mb-2>
            <div flex-1 relative>
              <div
                i-mdi-magnify
                class="text-sm text-white/30 pointer-events-none left-3 top-1/2 absolute -translate-y-1/2"
              />
              <input
                v-model="searchQuery"
                type="search"
                placeholder="搜索书签…"
                border="1 solid border focus:border-accent"
                p="x-3 y-2"
                pl-9
                class="important-bg-input"
                text="sm white/90! placeholder-white/30!"
                outline-none rounded-lg w-full transition-200
              >
            </div>
            <BaseButton
              variant="default"
              size="sm"
              @click="showAddForm = !showAddForm"
            >
              <div :class="showAddForm ? 'i-mdi-chevron-up' : 'i-mdi-plus'" text-sm />
              <span>{{ showAddForm ? '收起' : '添加' }}</span>
            </BaseButton>
          </div>

          <!-- Add form (collapsible) -->
          <div
            v-if="showAddForm"
            flex="~ col gap-2" mb-3 p-3 rounded-lg
            class="border border-accent/30 border-solid bg-accent/5"
          >
            <div flex="~ gap-2">
              <BaseInput
                ref="inputRef"
                v-model="newName"
                placeholder="为当前页面命名…"
                class="flex-1"
                @keydown.enter="handleAdd()"
              />
              <BaseButton
                variant="primary"
                :disabled="!hasNewName"
                @click="handleAdd()"
              >
                收藏
              </BaseButton>
            </div>
            <div flex="~ gap-2 items-center">
              <button
                text="xs white/40 hover:white/70"
                border="1 solid border" px-2 py-1 rounded bg-transparent cursor-pointer transition-200
                @click="fillOriginalTitle"
              >
                原标题
              </button>
              <button
                text="xs white/40 hover:white/70"
                border="1 solid border" px-2 py-1 rounded bg-transparent cursor-pointer transition-200
                :title="domainRegex ? `正则: ${domainRegex}` : '未设置正则，请在域名管理中配置'"
                @click="applyRegex"
              >
                正则提取原标题
              </button>
            </div>
            <!-- Regex pattern editor — second row -->
            <div flex="~ items-center gap-2">
              <span text="xs white/30" flex-shrink-0>正则</span>
              <input
                :value="domainRegex || ''"
                type="text"
                placeholder="未设置，如 ^(.+?)\s*\|\s*Danbooru$"
                border="1 solid border focus:border-accent"
                p="x-2 y-2"
                class="flex-1 important-bg-input"
                text="xs white/60! placeholder-white/20!"
                outline-none rounded-lg transition-200
                @change="saveDomainRegex(hostname, ($event.target as HTMLInputElement).value.trim())"
              >
            </div>
          </div>

          <!-- Bookmark list -->
          <template v-if="currentBookmarks.length === 0">
            <div flex="~ col items-center" text="white/25" text-sm py-8>
              <div i-mdi-bookmark-off-outline text-4xl mb-2 op-30 />
              <p>暂无书签</p>
              <p v-if="!showAddForm" text-xs mt-1>
                点击「添加」开始收藏
              </p>
            </div>
          </template>

          <template v-else-if="filteredBookmarks.length === 0">
            <div flex="~ col items-center" text="white/25" text-sm py-8>
              <div i-mdi-magnify text-4xl mb-2 op-30 />
              <p>无匹配书签</p>
              <p text-xs mt-1>
                试试其他关键词
              </p>
            </div>
          </template>

          <template v-else>
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
                  target="_blank"
                  rel="noopener noreferrer"
                  un-text="sm white/90!" font-sans py-2.5 op-80 no-underline flex flex-1 min-w-0 items-center
                  class="transition-all duration-200 group-hover:op-100 group-hover:text-[var(--c-accent)]!"
                >
                  <span class="truncate">{{ bm.name }}</span>
                </a>

                <button
                  text-white ml-1 p-1 border-none bg-transparent
                  op-40 flex shrink-0 cursor-pointer items-center
                  class="transition-all duration-200 hover:text-accent! hover:op-100!"
                  title="编辑名称"
                  @click="startEdit(i, bm.name)"
                >
                  <div i-mdi-pencil text-xs />
                </button>

                <button
                  p-1 border-none bg-transparent flex shrink-0 cursor-pointer items-center
                  class="text-red-400/60 transition-all duration-200 relative z-2 hover:text-red-400! hover:op-100!"
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
        </template>

        <!-- Settings view -->
        <SettingsPage
          v-if="currentView === 'settings'"
          @back="currentView = 'bookmarks'"
        />
      </div>
    </div>
  </Transition>
</template>
