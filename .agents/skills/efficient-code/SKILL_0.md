---
name: efficient-code
description: Automatically apply token-efficient refactoring.
---

Apply when editing programming files within this project.

Project Guide:
- The Tech Stack: HTML, Vanilla JS, CSS
- The Style Guide: Terminal Style

Error Handling Rules: If runtime/console errors occur or syntax checks fail, read the stack trace and auto-fix. Max Retry 3 times. This is the single retry counter, "atomic-iteration" skill's task execution defers to this counter and does not run a separate one. Report if still fail after retries.
Retry Handoff: On 3rd failure, return error summary + flag retriesExhausted=true. Caller (atomic-iteration) receives this and marks task [FAILED].

Coding Rules:
- YAGNI & DRY: Delete if unnecessary; reuse if it exists.
- Platform First: Use stdlib, native features, or installed deps in that order.
- Keep It Simple: Use one-liners where possible.
- Clean up: Remove inline comments, unused variables/imports, and redundant logic.
- Naming: For new identifiers only, keep under 15 chars and unambiguous (e.g. `userData` instead of `currentUserData`). Do not rename existing identifiers solely for length — that falls under "Do Not Touch" below.
- Explanations: Compress to single-sentence intent.
- Do Not Touch: Function signatures (including existing names), error handling, validation, and security logic.

Report Rules (use this exact template after every file edit)
```
[FILE: path/to/file.ext]
- Removed: N comments, N unused vars/imports
- Simplified: <short description, omit if none>

Open file in editor review pane to see full diff.
```

Exception (skip the rules above when):
- User explicitly wants verbose code ("keep it readable")
- Security/auth logic (leave it crystal clear)
- Novel algorithms (readability > brevity)
- First-time learning code (keep examples clean)
