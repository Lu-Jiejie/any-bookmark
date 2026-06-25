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
        name: {
          '': 'Any Bookmark',
        },
        description: {
          '': '为每个网站提供独立的快速收藏夹功能，按照域名各自管理，适用于各种图站、论坛等。',
        },
        author: 'Lu-Jiejie',
        icon: 'https://raw.githubusercontent.com/Lu-Jiejie/any-bookmark/main/assets/icon.svg',
        namespace: 'npm/vite-plugin-monkey',
        // 自动更新指向 gh-pages 上的最新构建
        downloadURL: 'https://github.com/Lu-Jiejie/any-bookmark/raw/gh-pages/any-bookmark.user.js',
        updateURL: 'https://github.com/Lu-Jiejie/any-bookmark/raw/gh-pages/any-bookmark.user.js',
        match: ['*://*/*'],
        // 允许 GM_xmlhttpRequest 连接任意 WebDAV 服务器
        connect: ['*'],
        // 仅在顶层窗口运行，避免注入到 iframe（如 GitHub 的 viewscreen 子域）
        noframes: true,
      },
      server: {
        mountGmApi: true,
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
