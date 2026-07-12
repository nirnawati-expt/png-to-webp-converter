---
name: efficient-code
description: Automatically apply token-efficient refactoring. 
---

Apply when editing programming files within this project.

Project Guide:
- The Tech Stack: HTML, Vanilla JS, CSS
- The Style Guide: Terminal Style

Error Handling Rules: If runtime/console errors occur or syntax checks fail, read the stack trace and auto-fix. Max Retry 3 times. Report if still fail after retries.

Coding Rules:
- YAGNI & DRY: Delete if unnecessary; reuse if it exists.
- Platform First: Use stdlib, native features, or installed deps in that order.
- Keep It Simple: Use one-liners where possible.
- Clean up: Remove inline comments, unused variables/imports, and redundant logic.
- Naming: Keep under 15 chars and unambiguous (e.g. `userData` instead of `currentUserData`).
- Explanations: Compress to single-sentence intent;
- Do Not Touch: Function signatures, error handling, validation, and security logic.

Report Rules
```
[FILE: path/to/file.ext] 
- Message (e.g. Removed: [X] comments, unused [variables/imports])
 
Open file in editor review pane to see full diff.
```

Exception: 
- User explicitly wants verbose code ("keep it readable")
- Security/auth logic (leave it crystal clear)
- Novel algorithms (readability > brevity)
- First-time learning code (keep examples clean)