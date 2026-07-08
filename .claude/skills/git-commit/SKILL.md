---
name: git-commit
description: Use this skill whenever the user asks to create a git commit in this repository — phrasings like "haz un commit", "commitea esto", "crea el commit", "commit this", "commit these changes", or "/commit". It defines this project's Conventional Commits format and the workflow for grouping pending changes into one or more logically-related commits before creating them. Do NOT trigger it for unrelated git operations (push, rebase, branch, merge) unless committing is explicitly requested.
---

# Commit Conventions

Create commits that follow this project's style. Never commit without the user having asked for it.

## Message format

```
<type>: <imperative summary, lowercase, no trailing period>

[optional body explaining WHY, not what — the diff already shows what changed]
```

### Types

- `feat` — new feature or capability
- `fix` — bug fix
- `refactor` — code change that neither fixes a bug nor adds a feature
- `build` — build system, dependencies, tooling
- `chore` — maintenance with no production code change
- `docs` — documentation only
- `style` — formatting, no logic change
- `test` — adding or correcting tests
- `perf` — performance improvement

### Writing rules

- English, imperative mood ("add", not "added"/"adds").
- Summary line ≤ 72 chars, lowercase after the colon, no trailing period.
- Body only when it adds context the diff doesn't already show — a decision, a constraint, a reason. Separate from the summary with a blank line.
- One logical change per commit — don't bundle unrelated changes under a single type.
- If a change touches multiple areas but serves one dominant intent (e.g. a new feature that required small refactors along the way), it's still one commit under that dominant type.

## Grouping workflow

1. Run `git status` and `git diff` (plus `git diff --staged` if anything is already staged) to see the real pending changes — never assume from conversation memory.
2. Check `git log --oneline -10` to confirm the style currently used in the repo.
3. Group the pending files by **intent**, not by folder or by "everything that changed today": each group must be describable with a single `type: summary`. Unrelated changes go in separate groups. If everything belongs to one logical unit, propose a single commit — don't split just to split.
4. Present the full plan before touching the repo, one entry per commit:

   ```
   Proposed commits (N):

   1) feat: add i18n support for spanish and english
      Files: astro.config.mjs, src/i18n/*, src/pages/es/*, src/components/LanguageSwitcher.astro

   2) refactor: extract shared expense form helpers
      Files: src/lib/expense-form.ts, src/lib/format.ts
   ```

   End with one line: "¿Confirmas el plan, ajustamos algo, o lo dejamos en un solo commit?"

5. On approval, stage each group with `git add <specific files>` (never `git add -A`) and commit it separately, in the order shown. After the last one, confirm with `git log --oneline -N`.
6. If the user asks for changes (merge groups, split further, edit a message, move a file to another group), apply them and show the updated plan before executing anything.
7. Don't `push` unless explicitly asked.

## What NOT to do

- Don't use `git add -A` blindly when unrelated files are present in the working tree.
- Don't invent a type when unsure — ask in one line if it's ambiguous (e.g. `feat` vs `refactor`).
- Don't rewrite history or force-push as part of this skill.