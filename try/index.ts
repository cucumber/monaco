import {
  buildStepDocuments,
  ExpressionBuilder,
  jsSearchIndex,
  WasmUrls,
} from '@cucumber/language-service'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

import { ConfigureEditor, configureMonaco } from '../src/index.js'

async function makeConfigureEditor(): Promise<ConfigureEditor> {
  const expressionBuilder = new ExpressionBuilder()

  const wasmUrls: WasmUrls = {
    java: 'tree-sitter-java.wasm',
    typescript: 'tree-sitter-typescript.wasm',
  }

  await expressionBuilder.init(wasmUrls)

  const expressions = expressionBuilder.build('java', [
    `
class StepDefinitions {
    @Given("I have {int} cukes in my belly"  )
    void method1() {
    }

    @Given("there are {int} blind mice")
    void method2() {
    }
}
`,
  ])

  const docs = buildStepDocuments(
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

// @ts-ignore
const editor1 = monaco.editor.create(document.getElementById('editor1'), {
  value,
  language: 'gherkin',
  theme: 'vs-dark',
  // semantic tokens provider is disabled by default
  'semanticHighlighting.enabled': true,
})

// @ts-ignore
const editor2 = monaco.editor.create(document.getElementById('editor2'), {
  value,
  language: 'gherkin',
  theme: 'vs-dark',
  // semantic tokens provider is disabled by default
  'semanticHighlighting.enabled': true,
})

makeConfigureEditor()
  .then((configureEditor) => {
    configureEditor(editor1)
    configureEditor(editor2)
    console.log('Booted')
  })
  .catch((err) => console.error(err.stack))
