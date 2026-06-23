import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import monkey, { cdn } from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['*://*/*'],
        // 仅在顶层窗口运行，避免注入到 iframe（如 GitHub 的 viewscreen 子域）
        noframes: true,
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
        // 所有样式（UnoCSS、main.css、SFC scoped）经此钩子缓存到全局，
        // 由 main.ts 在 Shadow DOM 就绪后注入，避免污染宿主页面。
        // 注意：@property 规则需由 main.ts 拆出注入文档级，否则 shadow 内变量失效
        cssSideEffects: (css) => {
          const w = globalThis as any
          ;(w.__anyBookmarkCss ||= []).push(css)
          w.__anyBookmarkApplyCss?.()
        },
      },
    }),
  ],
})
