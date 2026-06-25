<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSync } from '../composables/useSync'
// import/export moved to SettingsPage Data tab
import { getSyncConfig } from '../utils/sync'
import BaseButton from './ui/BaseButton.vue'
import BaseInput from './ui/BaseInput.vue'

defineProps<{
  /** 嵌入设置页时隐藏自带标题栏 */
  embedded?: boolean
}>()

const emit = defineEmits<{
  back: []
}>()

const {
  status,
  lastSyncTime,
  error,
  isConfigured,
  setupSync,
  toggleAutoSync,
  autoSyncEnabled,
} = useSync()

const existing = getSyncConfig()
const url = ref(existing?.url ?? '')
const username = ref(existing?.username ?? '')
const password = ref(existing?.password ?? '')
const showPassword = ref(false)

const localError = ref<string | null>(null)
const connecting = ref(false)

const canConnect = computed(() =>
  url.value.trim() && username.value.trim() && password.value.trim(),
)

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

function effectiveConfig() {
  return {
    url: url.value.trim(),
    username: username.value.trim(),
    password: password.value,
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
</script>

<template>
  <div flex="~ col">
    <template v-if="!embedded">
      <div flex="~ items-center justify-between" mb-3>
        <div flex gap-2.5 items-center>
          <div i-mdi-cog text-lg text-accent />
          <span text-base text-white tracking-wider font-bold font-serif>同步设置</span>
        </div>
        <BaseButton variant="ghost" @click="emit('back')">
          <div i-mdi-close text-lg />
        </BaseButton>
      </div>

      <div mb-3 h-px to-transparent bg-gradient-to-r from="[var(--border-dark)]" via="[var(--c-accent)]" />
    </template>

    <!-- Not configured -->
    <template v-if="!isConfigured">
      <p text="white/60" text-xs mb-3>
        配置 WebDAV 同步后，书签将在所有登录同一账号的设备间自动同步。
      </p>

      <div flex="~ col gap-2.5" mb-3>
        <BaseInput v-model="url" type="url" placeholder="WebDAV 目录地址，如 https://nas.lan/dav/any-bookmark" />
        <BaseInput v-model="username" placeholder="用户名" />
        <div relative>
          <BaseInput
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="密码"
          />
          <button
            class="text-sm text-white/30 p-0.5 border-none bg-transparent cursor-pointer transition-200 right-2.5 top-1/2 absolute hover:text-white/60 -translate-y-1/2"
            @click="showPassword = !showPassword"
          >
            <div :class="showPassword ? 'i-mdi-eye-off' : 'i-mdi-eye'" />
          </button>
        </div>
      </div>

      <BaseButton
        variant="primary"
        :disabled="!canConnect || connecting"
        @click="handleConnect()"
      >
        <div v-if="connecting" i-mdi-loading text-sm animate-spin />
        <span>{{ connecting ? '连接中…' : '连接并同步' }}</span>
      </BaseButton>

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

      <p text="xs white/30" mb-3>
        每 5 分钟自动检查一次远程更新，添加或删除书签后 3 秒内自动推送。
      </p>

      <p v-if="localError" text="red-400 text-xs" mb-2>
        {{ localError }}
      </p>
      <p v-if="error && !localError" text="red-400 text-xs" mb-2>
        {{ error }}
      </p>

      <BaseButton variant="primary" :disabled="connecting" @click="handleSyncNow()">
        <div v-if="connecting" i-mdi-loading text-sm animate-spin />
        <span>{{ connecting ? '同步中…' : '立即同步' }}</span>
      </BaseButton>

      <div text="white/40" text-xs tracking-wider font-bold mb-1 mt-4 uppercase>
        服务器配置
      </div>

      <div flex="~ col gap-2.5" mb-3 mt-2>
        <BaseInput v-model="url" type="url" placeholder="WebDAV 目录地址" />
        <BaseInput v-model="username" placeholder="用户名" />
        <div relative>
          <BaseInput
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="密码"
          />
          <button
            class="text-sm text-white/30 p-0.5 border-none bg-transparent cursor-pointer transition-200 right-2.5 top-1/2 absolute hover:text-white/60 -translate-y-1/2"
            @click="showPassword = !showPassword"
          >
            <div :class="showPassword ? 'i-mdi-eye-off' : 'i-mdi-eye'" />
          </button>
        </div>
      </div>

      <div flex="~ gap-2">
        <BaseButton variant="default" class="flex-1" :disabled="!canUpdate || connecting" @click="handleUpdate()">
          更新配置
        </BaseButton>
        <BaseButton
          :variant="autoSyncEnabled ? 'default' : 'primary'"
          @click="toggleAutoSync()"
        >
          {{ autoSyncEnabled ? '关闭自动同步' : '开启自动同步' }}
        </BaseButton>
      </div>
    </template>
  </div>
</template>
