# Material 3 Expressive implementation

The interface uses local bundles of Google's `@material/web` for buttons, select menus, switches, checkboxes, dialogs, focus/ripple states, and progress indicators; `@material/material-color-utilities` generates tonal palettes using the 2025 specification. Roboto Flex and Material Symbols Rounded are self-hosted.

The web implementation follows Material 3 Expressive visual principles: role-based dynamic color, tonal surface hierarchy, prominent typography, large / asymmetric corner treatments, connected selection groups, and state feedback. These custom chart, dashboard, navigation and preview surfaces are application implementations of the design language, not a claim that Google provides an official Expressive web component for every element.

References:
- https://m3.material.io/ — Material 3 Expressive design system
- https://m3.material.io/styles/motion/overview/how-it-works — motion / interaction guidance
- https://material-web.dev/ — official Material Web components
- https://github.com/material-foundation/material-color-utilities — official dynamic color algorithms

## Interaction

- Hash-based pages replace page content and track browser Back / Forward. The side navigation highlights the current page; it no longer scrolls between sections.
- Date chips preselect the saved default range. Latest recorded activity is selected after data loading; model details preselect the first model. Pointer hover or keyboard focus shows a transient exact-value preview; click fixes the date / model selection.
- Tooltip placement stays inside the viewport. Escape dismisses previews; scroll or loss of focus removes them. Touch uses click selection.
- Module changes are staged in a dialog, with add / hide / move-up / move-down controls. Save commits changes; cancel discards changes. Layout is persisted in browser localStorage.
- Themes, seed color, number unit, decimal precision, preview preference and default dates are persisted per browser. Material dynamic colors regenerate for light / dark / OS theme changes.
- `prefers-reduced-motion` disables custom transition / entrance animation.

## Number display

Automatic English uses K / M / B (10³ / 10⁶ / 10⁹). Automatic Chinese uses 万 / 亿 (10⁴ / 10⁸). Fixed choices include M, 百万, B, 亿 and exact full numbers. This changes actual scaling, not merely suffix strings. Values below display precision use `<minimum` instead of misleading zero; exact values remain available in previews and JSON exports. Currency is USD with two decimals.

## Upstream total consistency

Official graph totals include input, output, cacheRead, cacheWrite and reasoning. Filtered totals sum each of these exactly once, and the integration test compares the unfiltered UI aggregation to the official graph summary on real local data.

## Floating surfaces and selection feedback

Floating previews, menus, dialogs and toast messages use dedicated overlay tokens. Dark mode uses neutral tone 18 for the overlay surface, tone 94 for text, and black drop shadows; it does not use inverse surfaces or near-white text colors as shadow colors.

Date and metric selection controls keep their DOM nodes, widths, positions and reserved check slots during ordinary selection changes. The feedback is a 140 ms color / check transition and a 160 ms non-overshooting corner transition. Date changes update data modules without replaying a whole-page entrance; metric changes update chart regions while retaining the control and focus. Custom date fields still enter / leave when explicitly selected. Page changes use a short opacity transition without translation. Hover no longer reshapes or scales cards and buttons.
