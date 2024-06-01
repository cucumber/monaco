import { Expression } from '@cucumber/cucumber-expressions'
import {
  getGherkinCompletionItems,
  getGherkinDiagnostics,
  getGherkinFormattingEdits,
  getGherkinSemanticTokens,
  Index,
  semanticTokenTypes,
} from '@cucumber/language-service'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import { editor, IPosition, IRange } from 'monaco-editor/esm/vs/editor/editor.api'
import { DiagnosticSeverity, Position, Range, TextEdit } from 'vscode-languageserver-types'

type Monaco = typeof monacoEditor

export type ConfigureEditor = (editor: editor.IStandaloneCodeEditor) => void

export function configureMonaco(
  monaco: Monaco,
  index: Index,
  expressions: readonly Expression[]
): ConfigureEditor {
  monaco.languages.register({ id: 'gherkin' })

  // Syntax Highlighting (Semantic Tokens)

  monaco.languages.registerDocumentSemanticTokensProvider('gherkin', {
    getLegend: function () {
      return {
        tokenTypes: semanticTokenTypes,
        tokenModifiers: [],
      }
    },
    releaseDocumentSemanticTokens: function () {
      // no-op
    },
    provideDocumentSemanticTokens: function (model) {
      const gherkinSource = model.getValue()
      const tokens = getGherkinSemanticTokens(gherkinSource, expressions)
      const data = new Uint32Array(tokens.data)
      return {
        data,
      }
    },
  })

  // Auto-Complete

  monaco.languages.registerCompletionItemProvider('gherkin', {
    provideCompletionItems: function (model, position) {
      const gherkinSource = model.getValue()
      const completionItems = getGherkinCompletionItems(gherkinSource, toPosition(position), index)
      return {
        suggestions: completionItems.map((completionItem) => ({
          label: completionItem.label,
          kind: monaco.languages.CompletionItemKind.Text,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          insertText: (completionItem.textEdit as TextEdit).newText,
          range: toIRange((completionItem.textEdit as TextEdit).range),
        })),
      }
    },
  })

  // Document Formatting
  monaco.languages.registerDocumentFormattingEditProvider('gherkin', {
    provideDocumentFormattingEdits: function (model) {
      const gherkinSource = model.getValue()
      const textEdits = getGherkinFormattingEdits(gherkinSource)
      return textEdits.map((textEdit) => ({
        range: toIRange(textEdit.range),
        text: textEdit.newText,
      }))
    },
  })

  return function (editor) {
    // Diagnostics (Syntax validation)
    function setDiagnosticMarkers() {
      const model = editor.getModel()
      if (model) {
        const gherkinSource = model.getValue()
        const diagnostics = getGherkinDiagnostics(gherkinSource, expressions)
        const markers: monacoEditor.editor.IMarkerData[] = diagnostics.map((diagnostic) => {
          return {
            ...toIRange(diagnostic.range),
            severity: toSeverity(diagnostic.severity),
            message: diagnostic.message,
          }
        })
        monaco.editor.setModelMarkers(model, 'gherkin', markers)
      }
    }

    function requestValidation() {
      window.requestAnimationFrame(() => {
        setDiagnosticMarkers()
      })
    }

    requestValidation()

    let validationTimeout: NodeJS.Timeout
    editor.onDidChangeModelContent(() => {
      clearTimeout(validationTimeout)
      validationTimeout = setTimeout(requestValidation, 500)
    })
  }
}

function toIRange(range: Range): IRange {
  return {
    startLineNumber: range.start.line + 1,
    startColumn: range.start.character + 1,
    endLineNumber: range.end.line + 1,
    endColumn: range.end.character + 1,
  }
}

function toPosition(position: IPosition): Position {
  return {
    line: position.lineNumber - 1,
    character: position.column - 1,
  }
}

// https://github.com/microsoft/monaco-editor/blob/c49fdf9f0c131909ca1b661ca3ff4113c42f1c09/src/language/common/lspLanguageFeatures.ts#L121C1-L134C2
function toSeverity(lsSeverity: number | undefined): monacoEditor.MarkerSeverity {
	switch (lsSeverity) {
		case DiagnosticSeverity.Error:
			return monacoEditor.MarkerSeverity.Error;
		case DiagnosticSeverity.Warning:
			return monacoEditor.MarkerSeverity.Warning;
		case DiagnosticSeverity.Information:
			return monacoEditor.MarkerSeverity.Info;
		case DiagnosticSeverity.Hint:
			return monacoEditor.MarkerSeverity.Hint;
		default:
			return monacoEditor.MarkerSeverity.Info;
	}
}
