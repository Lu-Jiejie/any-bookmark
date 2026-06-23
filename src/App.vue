<script setup lang="ts">
import { ref } from 'vue'
import BookmarkPanel from './components/BookmarkPanel.vue'
import TriggerButton from './components/TriggerButton.vue'
import { currentDomainEnabled, setupSettings } from './composables/useSettings'

setupSettings()

const panelOpen = ref(false)
</script>

<template>
  <template v-if="currentDomainEnabled">
    <TriggerButton @toggle="panelOpen = !panelOpen" />
    <BookmarkPanel :open="panelOpen" @close="panelOpen = false" />
  </template>
</template>
