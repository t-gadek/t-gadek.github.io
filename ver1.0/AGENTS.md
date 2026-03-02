# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a static academic website hosted on Bitbucket Pages (`tgadek.bitbucket.io`). It serves as a personal homepage for a university lecturer, containing course materials for several subjects. The site is written entirely in Polish.

## Development

There is no build system, bundler, or package manager. The site is plain HTML/CSS/JS served directly by Bitbucket Pages.

**Local preview:** Open any `.html` file directly in a browser, or use a local server:
```
python3 -m http.server 8000
```

**Deployment:** Push to the `master` branch on Bitbucket. Bitbucket Pages serves the repo root automatically.

## Architecture

### Page Layout Pattern

Every page follows an identical HTML structure (no templating engine):

1. `<head>` — shared `meta` tags (author, description), favicon from `./img/tgadek-logo.png`, and a theme stylesheet via `<link id="theme-style" href="./css/general.css">`
2. `<header>` — logo + site title
3. `<nav>` — top-level course links (Home, TiJO, LD, PwC); some links are toggled on/off with HTML comments
4. `<div class="container"> > <div class="terminal">` — the main content area styled to look like a terminal window, with a top bar (red/yellow/green dots + theme toggle button)
5. `<footer>` — copyright
6. `<script src="./js/ThemeSwitcher.js">` — theme switcher loaded at the end of body

**When creating or editing pages, replicate this exact structure.** The nav links and commented-out nav items must stay consistent across all top-level pages. Sub-pages (inside course directories) use relative paths (`../css/general.css`, `../js/ThemeSwitcher.js`, etc.).

### Theming

Two CSS files implement dark/light mode:
- `css/general.css` — dark theme (default)
- `css/general-light.css` — light theme

`js/ThemeSwitcher.js` toggles between them by swapping the `href` attribute of the `<link id="theme-style">` element. The user's preference is persisted in `localStorage` under the key `theme`.

Both CSS files must be kept structurally in sync — they define the same selectors with different color values.

### Content Organization

Top-level course index pages sit in the repo root: `tijo.html`, `ld.html`, `pwc.html`, `nisp.html`, `jz.html`, `ti.html`.

Each course has a subdirectory for detailed lab/lecture sub-pages and assets:
- `tijo/` — lab pages (e.g., `assert-and-aaa.html`, `tdd.html`), images in `tijo/img/`, lecture PDFs in `tijo/lecture/`, source code examples in `tijo/source-code/`
- `ld/` — diploma seminar sub-pages, diploma PDFs in `ld/diploma-pdf/{year}/`
- `ti/` — sub-pages and static assets in `ti/static/`
- `nisp/` — lab PDFs and exam PDFs
- `pdf/lab/pwc/` — PwC course lab PDFs

The `app/` directory contains standalone student example apps (`calc`, `portfolio`), each with `dev/` and `prod/` variants. These are self-contained and do not use the main site's CSS/JS.

### Tables

Tables must be wrapped in `<div class="table-responsive-wrapper">` for mobile horizontal scrolling support.

### Language

All user-facing content is written in Polish. CSS comments are also in Polish.
