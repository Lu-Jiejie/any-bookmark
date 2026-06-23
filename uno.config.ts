import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  presetWind4,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-center', 'items-center justify-center'],
  ],
  theme: {
    colors: {
      'accent': 'var(--c-accent)',
      'surface': 'var(--c-surface)',
      'panel': 'var(--c-panel)',
      'input': 'var(--c-input)',
      'row': 'var(--c-row)',
      'border': 'var(--c-border)',
      'border-accent': 'var(--c-border-accent)',
    },
  },
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
