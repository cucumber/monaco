# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [0.9.0] - 2022-02-04
### Changed
- Use @cucumber/language-service 0.12.1
- Use monaco-editor 0.32.0
- No more dependency on @cucumber/language-service

## [0.8.0] - 2021-11-08
### Changed
- Use @cucumber/language-service 0.10.1
- Use monaco-editor 0.30.0

## [0.7.0] - 2021-11-08
### Changed
- Use @cucumber/language-service 0.10.0
- Use @cucumber/language-server 0.3.1

## [0.6.1] - 2021-11-04
### Fixed
- Fixed compilation error in demo code

## [0.6.0] - 2021-11-04
### Changed
- Upgrade to `@cucumber/language-service 0.9.0`

### Removed
- Removed the `<MonacoEditor>` React component (moved it to the `try` directory)

## [0.5.1] - 2021-11-02

## 0.5.1 - 2021-11-02
### Fixed
- Upgrade to `@cucumber/language-service` version `0.8.0` (should be backwards compatible)

## [0.5.0] - 2021-11-02
### Added
- Add a `<MonacoEditor>` React component

## [0.4.0] - 2021-10-13
### Changed
- Upgrade to `@cucumber/language-service 0.5.0`

## [0.3.0] - 2021-09-09
### Changed
- Changed exports and API so the monaco global is configured once, and each editor configured once each.

### Fixed
- Fixed double-rendering of auto-complete

## [0.2.0] - 2021-09-08
### Changed
- Add an `editor` argument to the `configure` function
([#1737](https://github.com/cucumber/common/pull/1737)
[aslakhellesoy](https://github.com/aslakhellesoy))

### Fixed
- Fix event listener for diagnostics by listening to the editor directly
([#1737](https://github.com/cucumber/common/pull/1737)
[aslakhellesoy](https://github.com/aslakhellesoy))

## [0.1.0] - 2021-09-07
### Added
- Document Formatting
([#1732](https://github.com/cucumber/common/pull/1732)
[aslakhellesoy](https://github.com/aslakhellesoy))

## [0.0.1] - 2021-09-02
### Added
- First release

[Unreleased]: https://github.com/cucumber/monaco/compare/v0.9.0...HEAD
[0.9.0]: https://github.com/cucumber/monaco/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/cucumber/monaco/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/cucumber/monaco/compare/v0.6.1...v0.7.0
[0.6.1]: https://github.com/cucumber/monaco/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/cucumber/monaco/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/cucumber/monaco/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/cucumber/monaco/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/cucumber/monaco/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/cucumber/monaco/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/cucumber/monaco/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/cucumber/monaco/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/cucumber/monaco/tree/v0.0.1
