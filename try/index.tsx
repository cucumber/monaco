import { ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import {
  buildSuggestions,
  ExpressionBuilder,
  jsSearchIndex,
  LanguageName,
  Source,
} from '@cucumber/language-service'
import { WasmParserAdapter } from '@cucumber/language-service/wasm'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import React from 'react'
import { render } from 'react-dom'

import { ConfigureEditor, configureMonaco } from '../src/index.js'
import { MonacoEditor } from './MonacoEditor.js'

async function makeConfigureEditor(): Promise<ConfigureEditor> {
  monaco.languages.register({ id: 'typescript' })

  const adapter = new WasmParserAdapter('.')
  await adapter.init()
  const expressionBuilder = new ExpressionBuilder(adapter)

  const sources: Source<LanguageName>[] = [
    {
      language: 'java',
      path: 'StepDefinitions.java',
      content: `class StepDefinitions {
    @Given("I have {int} cukes in my belly"  )
    void method1() {
    }

    @Given("there are {int} blind mice")
    void method2() {
    }

    @Given("there is/are some/none/1 apple(s)")
    void method2() {
    }
}
`,
    },
  ]

  const { expressions } = expressionBuilder.build(sources, [])

  const registry = new ParameterTypeRegistry()
  const docs = buildSuggestions(
    registry,
    ['I have 42 cukes in my belly', 'I have 96 cukes in my belly', 'there are 38 blind mice'],
    expressions
  )
  const index = jsSearchIndex(docs)
  return configureMonaco(monaco, index, expressions)
}

const value = `@foo
Feature: Hello
Scenario: Hi
  Given I have 58 cukes in my belly
  And this is an undefined step
    | some | poorly |
    | formatted | table |
`

const options = {
  value,
  language: 'gherkin',
  theme: 'vs-dark',
  // semantic tokens provider is disabled by default
  'semanticHighlighting.enabled': true,
}

makeConfigureEditor()
  .then((configureEditor) => {
    // @ts-ignore
    configureEditor(monaco.editor.create(document.getElementById('editor1'), options))
    render(
      <MonacoEditor options={options} className="editor" configure={configureEditor} />,
      document.getElementById('editor2')
    )
  })
  .catch((err) => console.error(err.stack))
