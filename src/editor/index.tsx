import * as React from 'react'
import { throttle, once } from 'lodash'
import { parse, lint } from 'mangudai'
import { language } from './rms-monarch-language'
import { theme } from './monokai-theme'
export { example } from './rms-example'

export interface EditorProps { code: string, height?: number | string }
export interface EditorState { code: string }

export class Editor extends React.PureComponent<EditorProps, EditorState> {
  private model: monaco.editor.IModel
  private editor: monaco.editor.IStandaloneCodeEditor

  constructor (props: EditorProps) {
    super(props)

    registerStuff()

    this.model = monaco.editor.createModel(props.code, 'aoe2-rms')
    this.model.onDidChangeContent(() => {
      this.setState(() => ({ code: this.model.getValue() }))
      lintThrottled(this.model)
    })
  }

  componentDidMount () {
    this.editor = monaco.editor.create(this.refs.container as HTMLElement, {
      model: this.model,
      roundedSelection: false,
      scrollBeyondLastLine: false,
      cursorBlinking: 'smooth',
      wordWrap: 'on',
      theme: 'monokai'
    })
  }

  componentWillUnmount () {
    this.editor.dispose()
  }

  render () {
    return <div ref='container' style={{ height: this.props.height || 500 }}></div>
  }
}

const registerStuff = once(function () {
  monaco.languages.register({ id: 'aoe2-rms' })
  monaco.languages.setMonarchTokensProvider('aoe2-rms', language)
  monaco.editor.defineTheme('monokai', theme)
})

const lintThrottled = throttle((model: monaco.editor.IModel) => {
  const { ast, errors } = parse(model.getValue())
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
