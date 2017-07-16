import { example } from './rms-example'
import { language } from './rms-monarch-language'

monaco.languages.register({ id: 'aoe2-rms' })
monaco.languages.setMonarchTokensProvider('aoe2-rms', language)

monaco.editor.create(document.querySelector('.editor') as HTMLElement, {
  language: 'aoe2-rms',
  roundedSelection: false,
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  theme: 'vs-dark',
  value: example
})
