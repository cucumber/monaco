[![test-javascript](https://github.com/cucumber/monaco/actions/workflows/test-javascript.yml/badge.svg)](https://github.com/cucumber/monaco/actions/workflows/test-javascript.yml)

# Cucumber Monaco

This library configures a [monaco editor](https://github.com/microsoft/monaco-editor) to use [@cucumber/language-service](https://github.com/cucumber/language-service#readme)

[Live demo](https://cucumber.github.io/monaco/).

## Usage

The library can be used with vanilla DOM as well as React. See [try/index.tsx](try/index.tsx) (the source for the live demo) for details.

## Local demo

Build everything and serve the contents of `docs`:

    npm install
    npm run webpack
    npx http-server docs

Open `http://127.0.0.1:8080/`
