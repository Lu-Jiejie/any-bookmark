<script setup lang="ts">
import { ref } from 'vue'
import { exportAllData, importSettings } from '../utils/storage'
import DomainManager from './DomainManager.vue'
import SyncSettings from './SyncSettings.vue'
import BaseButton from './ui/BaseButton.vue'

const emit = defineEmits<{
  back: []
}>()

type TabId = 'sync' | 'domains' | 'data'

const tabs: { id: TabId, label: string, icon: string }[] = [
  { id: 'sync', label: '同步', icon: 'i-mdi-sync' },
  { id: 'domains', label: '域名', icon: 'i-mdi-web' },
  { id: 'data', label: '数据', icon: 'i-mdi-database' },
]

const activeTab = ref<TabId>('sync')

// Data tab state
const importInput = ref<HTMLInputElement>()
const importMessage = ref<string | null>(null)

function handleExport() {
  const blob = new Blob([exportAllData()], { type: 'application/json' })
  const u = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = u
  a.download = `any-bookmark-${new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '')}.json`
  document.body.append(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(u)
}

function handleImportClick() {
  importInput.value?.click()
}

async function handleImportFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file)
    return

  importMessage.value = null
  try {
    const text = await file.text()
    importSettings(text)
    importMessage.value = '导入成功，即将刷新页面…'
    setTimeout(() => location.reload(), 800)
  }
  catch {
    importMessage.value = '导入失败：文件格式无效'
  }
  finally {
    input.value = ''
  }
}
</script>

<template>
  <div flex="~ col">
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
        <div
          rounded-full bg-accent h-0.5 transition-200 bottom-0 left-0 right-0 absolute
          :class="activeTab === tab.id ? 'op-100 scale-100' : 'op-0 scale-x-50'"
        />
      </button>
    </div>

    <SyncSettings v-if="activeTab === 'sync'" embedded />
    <DomainManager v-if="activeTab === 'domains'" embedded />

    <!-- Data tab -->
    <div v-if="activeTab === 'data'" flex="~ col">
      <p text="white/60" text-xs mb-3>
        导出全部数据（书签、域名、正则模式、时间戳），或从之前导出的文件中恢复。
      </p>
      <div flex="~ gap-2">
        <BaseButton variant="primary" class="flex-1" @click="handleExport()">
          <div i-mdi-download text-sm />
          <span>导出全部数据</span>
        </BaseButton>
        <BaseButton variant="default" class="flex-1" @click="handleImportClick()">
          <div i-mdi-upload text-sm />
          <span>导入数据</span>
        </BaseButton>
        <input
          ref="importInput"
          type="file"
          accept=".json"
          hidden
          @change="handleImportFile"
        >
      </div>
      <p v-if="importMessage" text="green-400 text-xs" mt-2>
        {{ importMessage }}
      </p>
    </div>
  </div>
</template>
