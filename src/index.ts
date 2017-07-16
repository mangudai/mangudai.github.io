import { throttle } from 'lodash'
import { parse, lint } from 'mangudai'
import { language } from './rms-monarch-language'
import { theme } from './monokai-theme'
import { example } from './rms-example'

monaco.languages.register({ id: 'aoe2-rms' })
monaco.languages.setMonarchTokensProvider('aoe2-rms', language)
monaco.editor.defineTheme('monokai', theme)

const model = monaco.editor.createModel(example, 'aoe2-rms')
model.onDidChangeContent(() => {
  lintSometimes(model.getValue())
})

const lintSometimes = throttle((script: string) => {
  const { ast, errors } = parse(script)
  const textSpanErrors = ast ? lint(ast) : errors
  monaco.editor.setModelMarkers(model, 'rms-owner', textSpanErrors.map(error => ({
    severity: monaco.Severity.Error,
    message: error.message,
    startLineNumber: error.boundaries.start.line,
    startColumn: error.boundaries.start.col + 1,
    endLineNumber: error.boundaries.end.line,
    endColumn: error.boundaries.end.col + 1
  })))
}, 300, { leading: false, trailing: true })

monaco.editor.create(document.querySelector('.editor') as HTMLElement, {
  model: model,
  roundedSelection: false,
  scrollBeyondLastLine: false,
  cursorBlinking: 'smooth',
  wordWrap: 'on',
  theme: 'monokai'
})
