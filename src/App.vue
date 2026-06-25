<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import BookmarkPanel from './components/BookmarkPanel.vue'
import TriggerButton from './components/TriggerButton.vue'
import { currentDomainEnabled, setupSettings } from './composables/useSettings'
import { useSync } from './composables/useSync'

setupSettings()

const panelOpen = ref(false)

// 同步初始化
const { pullAndMerge, sync, startAutoSync, stopAutoSync, isConfigured } = useSync()

onMounted(async () => {
  if (!isConfigured.value)
    return
  try {
    await pullAndMerge()
  }
  catch { /* 启动时拉取失败静默处理 */ }
  startAutoSync(60000)
})

// 本地变更后延迟 3s 推送（不阻塞操作）
let pushDebounce: ReturnType<typeof setTimeout> | null = null
function onLocalChange() {
  if (!isConfigured.value)
    return
  if (pushDebounce)
    clearTimeout(pushDebounce)
  pushDebounce = setTimeout(() => {
    sync(true).catch(() => {})
  }, 3000)
}
onMounted(() => window.addEventListener('any-bookmark:local-changed', onLocalChange))
onUnmounted(() => {
  stopAutoSync()
  if (pushDebounce)
    clearTimeout(pushDebounce)
  window.removeEventListener('any-bookmark:local-changed', onLocalChange)
})
</script>

<template>
  <template v-if="currentDomainEnabled">
    <TriggerButton @toggle="panelOpen = !panelOpen" />
    <BookmarkPanel :open="panelOpen" @close="panelOpen = false" />
  </template>
</template>
