<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSync } from '../composables/useSync'
import { exportSettings, importSettings } from '../utils/storage'
import { getSyncConfig } from '../utils/sync'

const emit = defineEmits<{
  back: []
}>()

const {
  status,
  lastSyncTime,
  error,
  isConfigured,
  setupSync,
  disconnectSync,
} = useSync()

const existing = getSyncConfig()
const url = ref(existing?.url ?? '')
const username = ref(existing?.username ?? '')
const password = ref('')
const showPassword = ref(false)

const localError = ref<string | null>(null)
const connecting = ref(false)

// "not configured" mode: all fields required
const canConnect = computed(() =>
  url.value.trim() && username.value.trim() && password.value.trim(),
)

// "configured" mode: url + username required, password = keep existing if empty
const canUpdate = computed(() =>
  url.value.trim() && username.value.trim(),
)

const statusText = computed(() => {
  switch (status.value) {
    case 'syncing': return '同步中…'
    case 'error': return '同步失败'
    case 'idle': return '同步正常'
    default: return ''
  }
})

const statusDotClass = computed(() => {
  switch (status.value) {
    case 'syncing': return 'bg-yellow-400'
    case 'error': return 'bg-red-400'
    case 'idle': return 'bg-green-400'
    default: return ''
  }
})

function formatTime(date: Date | null): string {
  if (!date)
    return '—'
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

/** Returns the effective config: falls back to existing stored password if input is empty */
function effectiveConfig() {
  const cfg = getSyncConfig()
  return {
    url: url.value.trim(),
    username: username.value.trim(),
    password: password.value || cfg?.password || '',
  }
}

async function handleConnect() {
  if (!canConnect.value || connecting.value)
    return
  connecting.value = true
  localError.value = null
  try {
    await setupSync({
      url: url.value.trim(),
      username: username.value.trim(),
      password: password.value,
    })
  }
  catch (e) {
    localError.value = e instanceof Error ? e.message : '连接失败'
  }
  finally {
    connecting.value = false
  }
}

async function handleUpdate() {
  if (!canUpdate.value || connecting.value)
    return
  connecting.value = true
  localError.value = null
  try {
    await setupSync(effectiveConfig())
  }
  catch (e) {
    localError.value = e instanceof Error ? e.message : '更新失败'
  }
  finally {
    connecting.value = false
  }
}

async function handleSyncNow() {
  const { sync } = useSync()
  connecting.value = true
  localError.value = null
  try {
    await sync()
  }
  catch (e) {
    localError.value = e instanceof Error ? e.message : '同步失败'
  }
  finally {
    connecting.value = false
  }
}

function handleDisconnect() {
  disconnectSync()
  url.value = ''
  username.value = ''
  password.value = ''
}

const importInput = ref<HTMLInputElement>()
const importMessage = ref<string | null>(null)

function handleExport() {
  const blob = new Blob([exportSettings()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `any-bookmark-${new Date().toISOString().slice(0, 10)}.json`
  document.body.append(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
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
    // 刷新以使 useBookmarks 等重新加载数据
    setTimeout(() => location.reload(), 800)
  }
  catch {
    importMessage.value = '导入失败：文件格式无效'
  }
  finally {
    // 重置 input 以允许重复导入同一文件
    input.value = ''
  }
}
</script>

<template>
  <div flex="~ col">
    <div flex="~ items-center justify-between" mb-3>
      <div flex gap-2.5 items-center>
        <div i-mdi-cog text-lg text-accent />
        <span text-base text-white tracking-wider font-bold font-serif>同步设置</span>
      </div>
      <button
        text-white p-0.5 border-none bg-transparent op-40 cursor-pointer transition-colors duration-200 hover:op-90
        @click="emit('back')"
      >
        <div i-mdi-close text-lg />
      </button>
    </div>

    <div mb-3 h-px to-transparent bg-gradient-to-r from="[var(--border-dark)]" via="[var(--c-accent)]" />

    <!-- Not configured -->
    <template v-if="!isConfigured">
      <p text="white/60" text-xs mb-3>
        配置 WebDAV 同步后，书签将在所有登录同一账号的设备间自动同步。
      </p>

      <div flex="~ col gap-2.5" mb-3>
        <input
          v-model="url"
          type="url"
          placeholder="WebDAV 目录地址，如 https://nas.lan/dav/any-bookmark"
          border="1 solid border focus:border-accent"
          p="x-3 y-2"
          text="sm white/90! placeholder-white/30!"
          outline-none rounded-lg transition-200 important-bg-input
        >
        <input
          v-model="username"
          type="text"
          placeholder="用户名"
          border="1 solid border focus:border-accent"
          p="x-3 y-2"
          text="sm white/90! placeholder-white/30!"
          outline-none rounded-lg transition-200 important-bg-input
        >
        <div relative>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="密码"
            border="1 solid border focus:border-accent"
            p="x-3 y-2"

            text="sm white/90! placeholder-white/30!"
            outline-none rounded-lg w-full transition-200 important-bg-input
          >
          <button
            class="text-sm text-white/30 p-0.5 border-none bg-transparent cursor-pointer transition-200 right-2.5 top-1/2 absolute hover:text-white/60 -translate-y-1/2"
            @click="showPassword = !showPassword"
          >
            <div :class="showPassword ? 'i-mdi-eye-off' : 'i-mdi-eye'" />
          </button>
        </div>
      </div>

      <button
        class="text-sm px-3 py-2 border border-accent rounded-lg border-solid flex gap-1 cursor-pointer transition-200 justify-center"
        :class="{
          'border-border! cursor-not-allowed text-white/40! bg-input': !canConnect || connecting,
          'bg-accent/10! text-accent/90 hover:bg-accent! hover:text-white/90': canConnect && !connecting,
        }"
        :disabled="!canConnect || connecting"
        @click="handleConnect()"
      >
        <div v-if="connecting" i-mdi-loading text-sm animate-spin />
        <span>{{ connecting ? '连接中…' : '连接并同步' }}</span>
      </button>

      <p v-if="localError" text="red-400 text-xs" mt-2>
        {{ localError }}
      </p>
      <p v-if="error && !localError" text="red-400 text-xs" mt-2>
        {{ error }}
      </p>
    </template>

    <!-- Configured -->
    <template v-else>
      <div
        flex="~ items-center gap-2" mb-3 p-3 rounded-lg
        :class="{
          'bg-green-900/20': status === 'idle',
          'bg-yellow-900/20': status === 'syncing',
          'bg-red-900/20': status === 'error',
        }"
      >
        <div rounded-full flex-shrink-0 h-2.5 w-2.5 :class="statusDotClass" />
        <div flex="~ col gap-0.5">
          <span text-sm text-white>{{ statusText }}</span>
          <span v-if="lastSyncTime" text="white/40" text-xs>
            上次同步：{{ formatTime(lastSyncTime) }}
          </span>
        </div>
      </div>

      <div v-if="localError" text="red-400 text-xs" mb-2>
        {{ localError }}
      </div>
      <div v-if="error && !localError" text="red-400 text-xs" mb-2>
        {{ error }}
      </div>

      <button
        class="text-sm text-accent/90 px-3 py-2 border border-accent rounded-lg border-solid flex gap-1 cursor-pointer transition-200 justify-center hover:text-white/90 bg-accent/10! hover:bg-accent!"
        :disabled="connecting"
        @click="handleSyncNow()"
      >
        <div v-if="connecting" i-mdi-loading text-sm animate-spin />
        <span>{{ connecting ? '同步中…' : '立即同步' }}</span>
      </button>

      <div text="white/40" text-xs tracking-wider font-bold mb-1 mt-4 uppercase>
        服务器配置
      </div>

      <div flex="~ col gap-2.5" mb-3 mt-2>
        <input
          v-model="url"
          type="url"
          placeholder="WebDAV 目录地址"
          border="1 solid border focus:border-accent"
          p="x-3 y-2"
          text="sm white/90! placeholder-white/30!"
          outline-none rounded-lg transition-200 important-bg-input
        >
        <input
          v-model="username"
          type="text"
          placeholder="用户名"
          border="1 solid border focus:border-accent"
          p="x-3 y-2"
          text="sm white/90! placeholder-white/30!"
          outline-none rounded-lg transition-200 important-bg-input
        >
        <div relative>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="密码（留空则不修改）"
            border="1 solid border focus:border-accent"
            p="x-3 y-2"

            text="sm white/90! placeholder-white/30!"
            outline-none rounded-lg w-full transition-200 important-bg-input
          >
          <button
            class="text-sm text-white/30 p-0.5 border-none bg-transparent cursor-pointer transition-200 right-2.5 top-1/2 absolute hover:text-white/60 -translate-y-1/2"
            @click="showPassword = !showPassword"
          >
            <div :class="showPassword ? 'i-mdi-eye-off' : 'i-mdi-eye'" />
          </button>
        </div>
      </div>

      <div flex="~ gap-2">
        <button
          p="x-3 y-2"
          border="1 solid border rounded-lg"

          text="white/70" text-sm bg-input flex-1 cursor-pointer transition-200 hover:text-white
          :disabled="!canUpdate || connecting"
          @click="handleUpdate()"
        >
          更新配置
        </button>
        <button
          class="text-sm text-red-300 px-3 py-2 border border-red-400/50 rounded-lg border-solid bg-red-900/10 cursor-pointer transition-200 hover:bg-red-900/30"
          @click="handleDisconnect()"
        >
          断开同步
        </button>
      </div>

      <div text="white/40" text-xs tracking-wider font-bold mb-1 mt-4 uppercase>
        数据管理
      </div>

      <div flex="~ gap-2" mt-2>
        <button
          p="x-3 y-2"
          border="1 solid border rounded-lg"
          text="white/70" text-sm bg-input flex-1 cursor-pointer transition-200 hover:text-white
          @click="handleExport()"
        >
          导出设置
        </button>
        <button
          p="x-3 y-2"
          border="1 solid border rounded-lg"
          text="white/70" text-sm bg-input flex-1 cursor-pointer transition-200 hover:text-white
          @click="handleImportClick()"
        >
          导入设置
        </button>
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
    </template>
  </div>
</template>
