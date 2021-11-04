import * as monaco from 'monaco-editor'
import React, { useCallback, useLayoutEffect, useState } from 'react'

export const MonacoEditor: React.FC<{
  options: monaco.editor.IStandaloneEditorConstructionOptions
  className: string
  configure: (editor: monaco.editor.IStandaloneCodeEditor) => void
}> = ({ options, className, configure }) => {
  const [div, setDiv] = useState<HTMLDivElement | null>(null)
  const divCallback = useCallback((node: HTMLDivElement | null) => {
    setDiv(node)
  }, [])

  useLayoutEffect(() => {
    let editor: monaco.editor.IStandaloneCodeEditor
    if (div) {
      const domElement = document.createElement('div')
      domElement.classList.add(className)
      div.appendChild(domElement)
      editor = monaco.editor.create(domElement, options)
      configure(editor)
    }

    return () => {
      editor?.dispose()
      div?.firstElementChild && div?.removeChild(div.firstElementChild)
    }
  }, [className, configure, div, divCallback, options])

  return <div ref={divCallback} />
}
