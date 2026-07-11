---
name: semantic-git
description: Automatically generate semantic commits and structured PR descriptions (What/Why/Testing/Breaking Changes) based on changed files. Triggers on 'commit', 'create PR', 'push', etc.
---

# Semantic Git

Automate semantic commits and professional pull requests.

## Core Workflow
1. Commit: Generate semantic message and create commit.
2. Pull & Check: Pull from `main` and detect merge conflicts.
3. Push & PR: If clean, push and generate PR; if conflicted, halt and report.

## Auto-Detection (Priority Order)
*   Type: `test` (e.g., `.test.js`) → `docs` (`docs/`, `README.md`) → `chore` (`package.json`) → `fix` (contains "fix/bug/error") → `feat` (contains "new/add") → Mostly deletions (`refactor`) / Mostly additions (`feat`) → Default: `refactor`.
*   Scope: Top-level folder with the highest number of changed files. Skip if changes are scattered or repository-wide.
*   Format: `type(scope): description <50 chars` (plus an optional body if needed).

## Pull Request Template
```markdown
## What
[Summary of changes, 2-3 sentences]
## Why
[Problem solved / goal achieved]
## Testing
[Testing steps / commands / coverage]
## Breaking Changes
[List breaking changes or "None"]
```

## Output Format
Step 1: Review & Confirm
```Plaintext
[CHANGES SUMMARY] <list affected files>
[SUGGESTED COMMIT] type(scope): description
[SUGGESTED PR] (Matches the PR Template above)

Adjust message/description and confirm before committing? [y/n]
```

Step 2 & 3a: Success (No Conflicts)
```Plaintext
✓ Commit created: <hash> → Pulling from main...
✓ Pull successful (no conflicts) → Pushing to remote...
✓ Pushed successfully → Creating pull request...
✓ PR created: [https://github.com/owner/repo/pull/123](https://github.com/owner/repo/pull/123)

Branch: <branch-name>
Title: <commit-title>
```

Step 3b: Error (Conflicts Detected)
```Plaintext
Merge CONFLICTs detected in:
  - <path/to/conflicting_file.ext>

ACTION REQUIRED:
1. Review & resolve conflicts manually in your editor.
2. Stage resolved files: git add <files>
3. Continue workflow: git commit && git push
```

## Usage Rules
- When to Use: When the user asks to "commit", "push", "create PR", or when code changes are ready for versioning with an automated, structured description.
- When NOT to Use: When the user provides a specific exact commit message, requests a non-standard format, makes temporary/throwaway commits ("WIP", "temp"), or if the repository already has existing merge conflicts.