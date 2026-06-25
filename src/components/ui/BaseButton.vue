<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'default' | 'danger' | 'ghost'
  size?: 'sm' | 'md'
  disabled?: boolean
}>()
</script>

<template>
  <button
    :disabled="disabled"
    :class="{
      // 非 ghost 变体共享的基础结构
      'rounded-lg border-solid text-sm flex justify-center items-center gap-1 cursor-pointer transition-200': variant !== 'ghost',
      // sizes (non-ghost)
      'px-3 py-2': (variant !== 'ghost' && (!size || size === 'md')),
      'px-2 py-1 text-xs': (variant !== 'ghost' && size === 'sm'),
      // primary — 琥珀强调色
      'border border-accent bg-accent/10! text-accent/90 hover:bg-accent! hover:text-white/90': variant === 'primary' || !variant,
      // default — 白色边框
      'border border-[var(--c-border)] bg-input text-white/70 hover:text-white': variant === 'default',
      // danger — 红色边框
      'border border-red-400/50 bg-red-900/10 text-red-300 hover:bg-red-900/30': variant === 'danger',
      // ghost — 图标按钮 (no base padding)
      'text-white p-0.5 border-none bg-transparent op-40 hover:op-90 cursor-pointer transition-200': variant === 'ghost',
      // disabled
      'border-border! cursor-not-allowed text-white/40! bg-transparent! hover:text-white/40!': disabled,
    }"
  >
    <slot />
  </button>
</template>
