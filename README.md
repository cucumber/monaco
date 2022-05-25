[![test-javascript](https://github.com/cucumber/monaco/actions/workflows/test-javascript.yml/badge.svg)](https://github.com/cucumber/monaco/actions/workflows/test-javascript.yml)

# Cucumber Monaco

This library configures a [monaco editor](https://github.com/microsoft/monaco-editor) to use [@cucumber/language-service](https://github.com/cucumber/language-service#readme)

The editor can be embedded on web pages and offers similar functionality to the 
[VSCode Cucumber Extension](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official)

The library ships with support for React as well as vanilla JavaScript. See the [try](./try) source code for details.

[Live demo](https://cucumber.github.io/monaco/).

## Usage

The library can be used with vanilla DOM as well as React. See [try/index.tsx](try/index.tsx) (the source for the live demo) for details.

## Local demo

Build everything and serve the contents of `docs`:

    npm install
    npm run webpack
    npx http-server -c-1 docs

Open `http://127.0.0.1:8080/`
