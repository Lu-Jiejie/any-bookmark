<script setup lang="ts">
import { useDraggable, useStorage, useWindowSize } from '@vueuse/core'
import { ref, useTemplateRef, watch } from 'vue'

const emit = defineEmits<{
  toggle: []
}>()

const btnRef = useTemplateRef('btnRef')

const { width, height } = useWindowSize()

const btnSize = 56
const margin = 24

// 超过这个距离认为是拖拽
const MOVE_THRESHOLD = 5

const startX = ref(0)
const startY = ref(0)
const dragged = ref(false)

function handlePointerDown(e: PointerEvent) {
  startX.value = e.clientX
  startY.value = e.clientY
  dragged.value = false
}

function handlePointerMove(e: PointerEvent) {
  if (dragged.value)
    return

  const dx = e.clientX - startX.value
  const dy = e.clientY - startY.value

  if (Math.hypot(dx, dy) > MOVE_THRESHOLD)
    dragged.value = true
}

function handleClick() {
  if (dragged.value)
    return

  emit('toggle')
}

// 持久化拖拽位置到 localStorage（仅本设备，不同步）
const savedX = useStorage<number | null>('any-bookmark-btn-x', null)
const savedY = useStorage<number | null>('any-bookmark-btn-y', null)

const defaultX = () => Math.max(0, width.value - btnSize - margin)
const defaultY = () => Math.max(0, height.value - btnSize - margin)

const { x, y, style } = useDraggable(btnRef, {
  initialValue: () => ({
    x: savedX.value ?? defaultX(),
    y: savedY.value ?? defaultY(),
  }),

  preventDefault: true,

  onMove() {
    x.value = Math.max(
      margin,
      Math.min(x.value, width.value - btnSize - margin),
    )

    y.value = Math.max(
      margin,
      Math.min(y.value, height.value - btnSize - margin),
    )
  },
})

// 拖拽停止后保存位置
watch([x, y], () => {
  savedX.value = x.value
  savedY.value = y.value
})

watch([width, height], () => {
  x.value = Math.max(
    margin,
    Math.min(x.value, width.value - btnSize - margin),
  )

  y.value = Math.max(
    margin,
    Math.min(y.value, height.value - btnSize - margin),
  )
})
</script>

<template>
  <div
    ref="btnRef"
    :style="style"
    text="2xl white" outline-none border="0 rounded-full" flex size-14 cursor-pointer select-none items-center justify-center fixed z-999999 touch-none
    class="trigger-btn bg-accent"
    role="button"
    tabindex="0"
    aria-label="打开书签"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @click="handleClick"
    @keydown.enter="emit('toggle')"
    @keydown.space.prevent="emit('toggle')"
  >
    <div class="icon-wrapper">
      <div
        i-mdi-bookmark-plus
        flex pointer-events-none
        items-center justify-center
      />
    </div>
  </div>
</template>

<style scoped>
.trigger-btn {
  /* 确保 box-shadow 完美过渡 */
  transition: box-shadow 300ms ease-in-out;

  /* 默认状态：收紧半径，全方位浓郁包裹 */
  box-shadow:
    0 0 6px color-mix(in srgb, var(--c-accent) 65%, transparent),
    /* 紧贴层 */ 0 0 12px color-mix(in srgb, var(--c-accent) 40%, transparent),
    /* 中间层 */ 0 0 24px color-mix(in srgb, var(--c-accent) 0%, transparent),
    /* 外围层（默认隐藏，半径大幅收紧） */ inset 0 0 0 1.5px color-mix(in srgb, var(--c-accent) 40%, transparent);
}

.trigger-btn:hover {
  /* Hover 状态：半径小幅提升，但浓度暴增，形成紧实的高亮火花感 */
  box-shadow:
    0 0 8px color-mix(in srgb, var(--c-accent) 95%, transparent),
    /* 核心爆光 */ 0 0 16px color-mix(in srgb, var(--c-accent) 75%, transparent),
    /* 浓郁过渡 */ 0 0 24px color-mix(in srgb, var(--c-accent) 40%, transparent),
    /* 边界控制在 24px 内，绝不溢出过多 */ inset 0 0 0 1.5px color-mix(in srgb, var(--c-accent) 75%, transparent);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
