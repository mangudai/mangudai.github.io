import * as React from 'react'
import { render } from 'react-dom'
import { Editor, example } from './editor'

render(
  <div className='container-fluid'>
    <h1>Age of Empires 2 Random Map Scripting Playground</h1>
    <div className='row'>
      <div className='col-xs-12'>
        <Editor code={example} height={700} />
      </div>
    </div>
  </div>,
  document.querySelector('.content')
)
