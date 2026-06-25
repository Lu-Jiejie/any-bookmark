<script setup lang="ts">
import { ref } from 'vue'
import DomainManager from './DomainManager.vue'
import SyncSettings from './SyncSettings.vue'
import BaseButton from './ui/BaseButton.vue'

const emit = defineEmits<{
  back: []
}>()

type TabId = 'sync' | 'domains'

const tabs: { id: TabId, label: string, icon: string }[] = [
  { id: 'sync', label: '同步', icon: 'i-mdi-sync' },
  { id: 'domains', label: '域名', icon: 'i-mdi-web' },
]

const activeTab = ref<TabId>('sync')
</script>

<template>
  <div flex="~ col">
    <!-- Header -->
    <div flex="~ items-center justify-between" mb-3>
      <div flex gap-2.5 items-center>
        <div i-mdi-cog text-lg text-accent />
        <span text-base text-white tracking-wider font-bold font-serif>设置</span>
      </div>
      <BaseButton variant="ghost" @click="emit('back')">
        <div i-mdi-close text-lg />
      </BaseButton>
    </div>

    <div mb-3 h-px to-transparent bg-gradient-to-r from="[var(--border-dark)]" via="[var(--c-accent)]" />

    <!-- Tab bar -->
    <div border-b="1 solid border" mb-3 flex>
      <button
        v-for="tab in tabs"
        :key="tab.id"

        text-sm px-4 py-2.5 border-none bg-transparent cursor-pointer transition-200 relative
        :class="activeTab === tab.id
          ? 'text-accent'
          : 'text-white/35 hover:text-white/60'"
        @click="activeTab = tab.id"
      >
        <div flex gap-1.5 items-center>
          <div :class="tab.icon" text-sm />
          <span>{{ tab.label }}</span>
        </div>
        <!-- Active indicator -->
        <div
          rounded-full bg-accent h-0.5 transition-200 bottom-0 left-0 right-0 absolute
          :class="activeTab === tab.id ? 'op-100 scale-100' : 'op-0 scale-x-50'"
        />
      </button>
    </div>

    <!-- Content -->
    <SyncSettings v-if="activeTab === 'sync'" embedded />
    <DomainManager v-if="activeTab === 'domains'" embedded />
  </div>
</template>
