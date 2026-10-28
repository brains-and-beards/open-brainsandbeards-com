import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { defineEcConfig } from 'astro-expressive-code'

export default defineEcConfig({
  themes: ['solarized-light'],
  plugins: [pluginLineNumbers()],
  styleOverrides: {
    borderRadius: '0.3em',
    borderWidth: '0',
    codeFontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    codeFontSize: '1em',
    codeLineHeight: '1.5',
    codePaddingBlock: '1em',
    codePaddingInline: '1em'
  },
  defaultProps: {
    showLineNumbers: false,
    frame: 'none',
    wrap: true
  },
  frames: {
    showCopyToClipboardButton: false
  }
})
