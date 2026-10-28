# DiffCheck

Compare two versions of text in your browser. Added lines are green, removed lines are red, and matching lines remain neutral.

## Run locally

Extract the ZIP and open **index.html**. Keep `app.js`, `core.js`, and `style.css` alongside it. No installation or internet connection is required.

## Features

- Line-by-line comparison with old/new line numbers.
- Ignore whitespace differences and/or letter case.
- Swap versions, load an example, and clear inputs with confirmation.
- Download a plain-text report.
- Responsive, keyboard-accessible light workspace with purple and turquoise accents.
- No dependencies, trackers, uploads, accounts or persisted input history.

## Behavior

Comparison uses a longest-common-subsequence algorithm. A modified line appears as a removal and an addition; this version does not highlight individual changed words. Repeated lines can have more than one valid alignment.

CRLF and CR line endings are normalized to LF. A trailing newline is treated as an extra empty line. Whitespace mode trims line edges and collapses spaces/tabs, while preserving blank lines. Case mode uses JavaScript lowercase conversion, not language-specific case folding. Matching rows show the updated version; a notice reports how many lines matched after normalization.

Editing either input or an option clears stale results and disables report download until you compare again. Inputs are limited to 100,000 UTF-16 code units and 1,200 lines per side to bound memory and processing costs. Long input may briefly occupy the main browser thread.

Reports include selected options and line numbers. They are readable text reports, **not patches suitable for git apply**. Text is inserted into the page using `textContent`, not interpreted as HTML. No input is saved: refreshing or closing the tab loses it. Browser extensions and hosting-provider access logs are outside the application's control.

## Publish to GitHub Pages

1. Create a public repository named `diffcheck`.
2. Upload all files inside this folder to the repository root on `main` (not the ZIP or outer folder).
3. Open **Settings → Pages**.
4. Select **Deploy from a branch → main → / (root)** and Save.
5. Wait for **Your site is live**, then use the exact link GitHub displays.

For `DanenLarping333/diffcheck`, the expected address after successful publication is `https://danenlarping333.github.io/diffcheck/`. This package has not created or published a GitHub repository. No `.github` workflow or `vendor` folder is needed.

## Checks

With Node.js installed:

```sh
node --check app.js
node core.test.cjs
```

Tests cover 150 deterministic reconstruction cases plus empty input, replacements, blank lines, trailing newline, CRLF, whitespace/case options, Unicode, report output and size limits. Real-browser visual and download testing remain to be completed.

Manual checks: load the example, compare your own text, toggle options and compare again, swap, download a report, and check the layout on a phone. Inputs such as `<script>alert(1)</script>` should display literally in results.

## Files

- `index.html`: interface
- `style.css`: responsive light theme
- `core.js`: comparison and report logic
- `app.js`: browser interactions
- `core.test.cjs`: automated checks
- `.nojekyll`: GitHub Pages configuration
- `LICENSE`: MIT license

