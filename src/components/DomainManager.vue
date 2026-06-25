<script setup lang="ts">
import { computed, watch } from 'vue'
import { usePagination } from '../composables/usePagination'
import { enabledDomains, removeEnabledDomain } from '../composables/useSettings'
import Pagination from './Pagination.vue'
import BaseButton from './ui/BaseButton.vue'

defineProps<{
  /** 嵌入设置页时隐藏自带标题栏 */
  embedded?: boolean
}>()

const emit = defineEmits<{
  back: []
}>()

const PAGE_SIZE = 10

const { current, paged, total } = usePagination(() => enabledDomains.value, PAGE_SIZE)

const emptyRowsCount = computed(() => PAGE_SIZE - paged.value.length)

watch(paged, (val) => {
  if (val.length === 0 && current.value > 1)
    current.value--
})

function handleRemove(domain: string) {
  // eslint-disable-next-line no-alert
  if (!confirm(`确定要移除域名 "${domain}" 吗？\n该域名下的书签不会被删除，但将不再显示收藏按钮。`))
    return
  removeEnabledDomain(domain)
}
</script>

<template>
  <div flex="~ col">
    <template v-if="!embedded">
      <div flex="~ items-center justify-between" mb-3>
        <div flex gap-2.5 items-center>
          <div i-mdi-web text-lg text-accent />
          <span text-base text-white tracking-wider font-bold font-serif>已启用的域名</span>
        </div>
        <BaseButton variant="ghost" @click="emit('back')">
          <div i-mdi-close text-lg />
        </BaseButton>
      </div>

      <div mb-3 h-px to-transparent bg-gradient-to-r from="[var(--border-dark)]" via="[var(--c-accent)]" />
    </template>

    <div
      v-if="enabledDomains.length === 0"
      flex="~ col items-center" text="sm white/30" py-8
    >
      <div i-mdi-web-off text-4xl mb-2 op-30 />
      <p>暂无已启用的域名</p>
      <p text-xs mt-1>
        在任意网站点击收藏按钮，该域名即自动启用并出现在此列表中。
      </p>
    </div>

    <template v-else>
      <div flex="~ col gap-1" p-1 border="1 solid border rounded-lg">
        <div
          v-for="domain in paged"
          :key="domain"
          border="1 solid transparent hover:border-accent"
          flex="~ items-center" px-3 rounded-lg bg-input transition-250
          class="group"
        >
          <a
            :href="`https://${domain}`"
            target="_blank"
            rel="noopener noreferrer"
            :title="domain"
            un-text="sm white/90!" font-sans py-2.5 op-80 no-underline flex flex-1 min-w-0 items-center
            class="transition-all duration-200 group-hover:op-100 group-hover:text-[var(--c-accent)]!"
          >
            <span class="truncate">{{ domain }}</span>
          </a>

          <button
            text-white ml-2 p-1 border-none bg-transparent op-30 flex shrink-0 cursor-pointer items-center
            class="transition-all duration-200 relative z-2 hover:text-red-400! hover:op-100!"
            @click="handleRemove(domain)"
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
  </div>
</template>
