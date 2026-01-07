---
description: Audit and update vulnerable dependencies
allowed-tools: Bash(bun audit:*), Bash(bun update:*), Bash(bun test:*)
---

Your goal is to audit and update any vulnerable dependencies in this project.

## Steps to follow:

1. **Run security audit**
   - Execute `bun audit` to identify vulnerable packages
   - Report all findings with severity levels

2. **Apply updates**
   - Run `bun update` to update outdated dependencies
   - Show what packages were updated

3. **Verify the updates**
   - Run `bun dev` briefly to ensure the dev server starts without errors
   - If tests exist, run them with `bun test` (if the script exists in package.json)
   - Report any breaking changes or issues

4. **Summary**
   - Provide a summary of vulnerabilities fixed
   - List any remaining vulnerabilities that couldn't be auto-fixed
   - Suggest manual actions if needed
