# Agent Instructions

- Always use `bun` as the package manager. Never use `npm` or `yarn`.
- Do not run test suites unless the user explicitly asks for it.
- Do not run build/compile/typecheck commands to verify your work unless the user explicitly asks for it, or you detect critical errors that require verification.
- Do not attempt to open a browser (e.g. Chrome) or generate screenshots. If you need to see how a module or component looks, ask the user to provide an image instead.
- Write all code in English: variables, constants, function/type names, everything. Comments may be in Spanish. UI copy shown to the user (labels, headings, messages) stays in Spanish, matching the app's display language.
- This project uses Astro 7. Before implementing or modifying anything related to Astro (config, routing, components, integrations, content collections, etc.), consult the `mcp__astro-docs__search_astro_docs` MCP tool first to check the latest documentation and best practices for this version.
- This project uses the `tailwind-animations` plugin (imported in `src/styles/global.css`) for transitions/animations. Before writing any new animation or transition, check `node_modules/tailwind-animations/src/index.css` (or its README) for an existing utility/keyframe that already does the job, and prefer its `animate-*` utilities (duration, delay, iteration-count, easing, fill-mode, etc.) over hand-rolled CSS. Only define custom `@keyframes` when the plugin truly has nothing that fits, and even then keep using its utility classes for timing/easing instead of hardcoding them.