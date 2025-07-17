# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] - 2025-07-17

### Breaking Changes

- Renamed all `styles` properties to `style` (singular)
- Migration: Change `something.styles` to `something.style`

### Added

- Interactivity system (hover/click on items)
- Panel component with animations
- Configuration for panel positioning/dimensions

### Changed

- Improved animation handling

### New Features

- **Panel System**:
  - Interactivity : `interactivity.enable` must be set to `true`.
    - Note : Only item with `item.panel.content` set are clickable. Other will not have any interactivity.
  - Global config: `options.panel`
  - Per-item config: `item.panel` (Override global config)
- **Customization**:
  - Position : `panel.position` for controlling the opened panel position on the screen (`top`, `bottom`, `left`, `right`, `center`, or combinations)
  - Dimension : `panel.dimension` is an object to specify the final `width` and `height` of the opening panel. It can parse any valid CSS units (e.g. `50%`, `25rem`...). Panels are responsive to the viewport dimension.
  - Animation : `panel.animation` for controlling the default timing of the panel's animation.
  - CSS: `panel.customCss` for custom class names
  - **Notes**: By design, the panel object has no `style` configuration Please use `panel.customCss` instead.
- **Backdrop**:
  - Toggle with `panel.backdrop` (default: `true`)
  - Click to close panel

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
