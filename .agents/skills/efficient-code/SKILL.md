---
name: efficient-code
description: Automatically apply token-efficient refactoring. 
---

# Efficient Code

Keep code lean without losing clarity. Apply when editing programming files.

## Core Refactor Rules

1. **YAGNI & DRY:** Delete if unnecessary; reuse if it exists.
2. **Platform First:** Use stdlib, native features, or installed deps in that order.
3. **Keep It Simple:** Use one-liners where possible.
4. **Clean up:** Remove inline comments, unused variables/imports, and redundant logic.

## Shortening Rules

- **Names:** Keep under 15 chars and unambiguous (`userData` instead of `currentUserData`).
- **Explanations:** Compress to single-sentence intent; no verbose text.
- **Do Not Touch:** Function signatures, error handling, validation, and security logic.

## Output Format

For single or multiple files, list changes using this format:

```text
[FILE: path/to/file.ext]

[CHANGES]
- Removed: [X] comments, unused [variables/imports]
- Renamed: `oldName` → `newName`
- Compressed: [logic description] from [X] lines → [Y]
- Deleted: [redundant code]

{ repeat again with format above if multiple files }
 
Open file in editor review pane to see full diff.
```

## When NOT to Compress
 
- User explicitly wants verbose code ("keep it readable")
- Security/auth logic (leave it crystal clear)
- Novel algorithms (readability > brevity)
- Team style guide says otherwise
- First-time learning code (keep examples clean)