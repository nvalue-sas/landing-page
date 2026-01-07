# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based landing page for nValue, a software development company. The site is built with Astro, TypeScript, and TailwindCSS v4, using Bun as the package manager and runtime.

## Development Commands

**Package Manager**: This project uses Bun (required). Do not use npm or yarn.

```bash
# Install dependencies
bun install

# Development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Format code with Prettier
bun x prettier --write .
```

## Architecture

### Project Structure

```
src/
├── assets/          # Static assets (images, icons, etc.)
├── components/
│   ├── navigation/  # Navbar, mobile menu, theme toggle, navigation items
│   └── sections/    # Page sections (Hero, Services, Portfolio, etc.)
├── data/           # Static data files (services.js)
├── i18n/           # Internationalization JSON files (es.json, en.json)
├── layouts/        # Base layout component (Layout.astro)
├── pages/          # Astro pages (index.astro)
├── styles/         # Global CSS (global.css)
└── utils/          # Helper functions (theme.ts, mobileMenu.ts, etc.)
```

### Key Architectural Patterns

**Single Page Application Structure**: The main page (`src/pages/index.astro`) imports all section components and renders them sequentially. The site uses hash-based navigation (`#hero`, `#services`, `#portfolio`) with scroll-smooth behavior.

**Component Organization**:
- Navigation components are isolated in `components/navigation/`
- Page sections are isolated in `components/sections/`
- Each section is a self-contained Astro component

**Internationalization (i18n)**:
- Configured in `astro.config.mjs` with Spanish (`es`) as default and English (`en`) support
- Translations live in `src/i18n/es.json` and `src/i18n/en.json`
- Default locale doesn't use URL prefix (`prefixDefaultLocale: false`)

**Theme System**:
- Dark/light mode managed via `src/utils/theme.ts`
- Theme preference stored in localStorage
- Falls back to system preference if no manual selection
- Theme is applied via the `dark` class on `<html>` element
- TailwindCSS dark mode variants handle styling

**Path Aliases**:
- `@/*` resolves to `./src/*` (configured in tsconfig.json)
- Always use `@/` imports instead of relative paths

**Styling**:
- TailwindCSS v4 configured via Vite plugin
- Global styles in `src/styles/global.css`
- Dark mode using class-based strategy
- Prettier plugin auto-sorts Tailwind classes

**Data Management**:
- Static data (like services) is stored in `src/data/` as JavaScript/JSON files
- Import directly into components as needed

## Code Conventions

**File Extensions**:
- Use `.astro` for Astro components
- Use `.ts` for TypeScript utilities
- Use `.js` for data files (e.g., services.js)

**Formatting**:
- Prettier is configured with plugins for Astro and TailwindCSS
- Run Prettier before committing changes
- Prettier config specifies `src/styles/global.css` as the Tailwind stylesheet reference

**Component Style**:
- Astro components use frontmatter (`---`) for logic/imports
- Keep components focused on single responsibility
- Section components should be self-contained with their own content

## CSS and Styling Rules

**TailwindCSS Required**:
- Always use TailwindCSS for all CSS modifications
- Use Context7 (`mcp__context7__query-docs`) to get up-to-date TailwindCSS v4 documentation before making styling changes
- Prefer Tailwind utility classes over custom CSS
- Use TailwindCSS v4 canonical class names (e.g., `shrink-0` instead of `flex-shrink-0`, `bg-linear-to-br` instead of `bg-gradient-to-br`)

**Icons**:
- Always use Lucide icons from `@lucide/astro` package
- Never create inline SVGs when a Lucide icon exists
- Import icons like: `import { IconName } from "@lucide/astro";`
- Use icons as components: `<IconName class="h-5 w-5" />`
- Browse available icons at https://lucide.dev/icons

## Important Notes

- The site defaults to dark mode (see `src/layouts/Layout.astro:12`)
- Navigation items are defined in `src/components/navigation/navItems.ts`
- Services data uses icon strings that map to icons via helper utilities
- Meta tags and SEO are configured in the base Layout component