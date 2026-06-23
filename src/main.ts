import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import 'uno.css'

const w = window as any

// 创建宿主元素并附加 Shadow DOM，将整个 UI 与样式与宿主页面隔离
const host = document.createElement('div')
host.id = 'any-bookmark-host'
document.body.append(host)

const shadow = host.attachShadow({ mode: 'open' })

// 样式由 vite-plugin-monkey 的 cssSideEffects 收集到 w.__anyBookmarkCss，
// 这里注入 shadow root，避免污染宿主页面
const shadowStyle = document.createElement('style')
shadow.append(shadowStyle)

// @property 规则必须在文档级注册才能生效（Shadow DOM 内的 <style> 会被忽略），
// 否则 presetWind4 的 --un-bg-opacity / --un-text-opacity 等变量在 shadow 内无初始值，
// 导致 color-mix(... var(--un-bg-opacity) ...) 整条失效。
// @property 仅声明类型与初始值、无视觉副作用，注入 head 不会污染宿主页面。
const propStyle = document.createElement('style')
propStyle.id = 'any-bookmark-properties'
document.head.append(propStyle)

const PROPERTY_RE = /@property\s[^{]+\{[^}]*\}/g

w.__anyBookmarkApplyCss = () => {
  const all = (w.__anyBookmarkCss ?? []).join('\n')
  propStyle.textContent = (all.match(PROPERTY_RE) ?? []).join('\n')
  shadowStyle.textContent = all.replace(PROPERTY_RE, '')
}
w.__anyBookmarkApplyCss()

// 开发模式下 cssSideEffects 不触发：Vite 会把样式以 <style data-vite-dev-id> 注入
// head（污染宿主页，且 shadow 内 UI 无样式）。这里把它们镜像进 shadow root，
// 并将 head 中的原样式置为 media="not all" 使其不作用于宿主页（仍保留供 HMR 更新）。
if (import.meta.env.DEV) {
  const syncDevStyles = () => {
    const devStyles = document.head.querySelectorAll<HTMLStyleElement>(
      'style[data-vite-dev-id]',
    )
    let css = ''
    devStyles.forEach((el) => {
      css += `\n${el.textContent ?? ''}`
      // media 改动不触发本 observer（只监听 childList/characterData），不会死循环
      if (el.media !== 'not all')
        el.media = 'not all'
    })
    w.__anyBookmarkCss = [css]
    w.__anyBookmarkApplyCss()
  }

  syncDevStyles()
  new MutationObserver(syncDevStyles).observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true,
  })
}

const mountPoint = document.createElement('div')
shadow.append(mountPoint)

createApp(App).mount(mountPoint)
