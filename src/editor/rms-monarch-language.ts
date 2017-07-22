export const language = {
  tokenPostfix: '.source.aoe2-rms',

  identifier: /\b[^\s!@#\$%\^&\*\(\)\-\+=;:'"<>{}\[\]\?\/\\][^\s;'"<>{}\[\]\/\\]*\b/,
  number: /\b\d+/,

  tokenizer: {
    root: [
      { include: '@whitespace' },
      { include: '@section' },
      { include: '@conditional' },
      { include: '@random' },
      { include: '@directive' },
      { include: '@command' }
    ],

    whitespace: [
      [ /\s+/, 'white' ],
      [ /\/\*/, 'comment.block', '@comment' ]
    ],

    comment: [
      [ /[^\/*]+/, 'comment.block' ],
      [ /\*\//, 'comment.block', '@pop' ],
      [ /[\/*]/, 'comment.block' ]
    ],

    section: [
      [ /<[A-Z_]+>/, 'storage.type.section' ]
    ],

    conditional: [
      [ /(if|elseif)([\t ]+)(@identifier)/, [ 'keyword.control.conditional', 'white', 'variable.other.const' ]],
      [ /(else|endif)/, 'keyword.control.conditional' ]
    ],

    random: [
      [ /\b(start_random|end_random)\b/, 'keyword.control.random' ],
      [ /\b(percent_chance)(\w+)(\d+)/, [ 'keyword.control.random', 'white', 'constant.numeric' ]]
    ],

    directive: [
      [ /#define|#const|#include_drs/, 'keyword.other.directive', '@arguments' ]
    ],

    arguments: [
      [ /(?=[\{\/\#])/, '', '@pop' ],
      [ /@number/, { cases: { '@eos': { token: 'constant.numeric', next: '@pop' }, '@default': 'constant.numeric' }}],
      [ /@identifier/, { cases: { '@eos': { token: 'variable.other.const', next: '@pop' }, '@default': 'variable.other.const' }}],
      [ /[\t ]+/, { cases: { '@eos': { token: 'white', next: '@pop' }, '@default': 'white' }}]
    ],

    command: [
      [ /@identifier/, { cases: { '@eos': 'entity.name.function', '@default': { token: 'entity.name.function', next: '@arguments' }}}],
      [ '{', 'punctuation.definition.mapping.begin', '@commandBlock' ]
    ],

    commandBlock: [
      { include: '@conditional' },
      { include: '@random' },
      { include: '@directive' },
      [ /\/\*/, 'comment.block', '@comment' ],
      [ /@identifier/, { cases: { '@eos': 'variable.parameter.attribute', '@default': { token: 'variable.parameter.attribute', next: '@arguments' }}}],
      [ '}', 'punctuation.definition.mapping.end', '@pop' ]
    ]
  }
} as monaco.languages.IMonarchLanguage
