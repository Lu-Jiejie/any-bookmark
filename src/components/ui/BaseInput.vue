<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string
  placeholder?: string
  type?: 'text' | 'url' | 'password' | 'search'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputEl = ref<HTMLInputElement>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

defineExpose({
  focus: () => inputEl.value?.focus(),
})
</script>

<template>
  <input
    ref="inputEl"
    :value="modelValue"
    :type="type || 'text'"
    :placeholder="placeholder"
    border="1 solid border focus:border-accent"
    p="x-3 y-2"
    class="important-bg-input"
    text="sm white/90! placeholder-white/30!"
    outline-none rounded-lg w-full transition-200
    @input="onInput"
  >
</template>
