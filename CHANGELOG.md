# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.0] - 2025-02-03

### Removed

- **Breaking Change**: The properties `borderColor`, `borderWidth`, `borderStyle`, and `backgroundColor` have been **removed**.
  - If you were using these properties, migrate to `styles.borderColor`, `styles.borderWidth`, `styles.borderStyle`, and `container.styles.backgroundColor`.

### Changed

- Improved the **styling system**: now, only `styles` are used for custom styles.
- Internal refactoring to improve maintainability and future extensibility.

---

## [0.2.0] - 2025-02-10

### Added

- Added container customization through `container.customCss` and `container.styles`.
- Added item customization through `item.customCss` and `item.styles`.
- Added console warnings for deprecated properties (`borderColor`, `borderWidth`, `borderStyle`, `backgroundColor`).

### Changed

- Updated the style application logic: the priority is now Default CSS -> Custom CSS -> Inline styles.

### Deprecated

- The properties `borderColor`, `borderWidth`, and `borderStyle` are now deprecated. Please use `orbit.styles.borderColor`, `orbit.styles.borderWidth`, and `orbit.styles.borderStyle` instead.
- The direct use of `backgroundColor` on the container level is deprecated in favor of `container.styles.backgroundColor`.

---

## [0.1.0] - 2025-01-15

### Added

- Initial release of the package with core features:
  - Circular orbit animations.
  - Basic customization via inline styles.
