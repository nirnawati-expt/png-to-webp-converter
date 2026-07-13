---
name: skill-evolution
description: Evaluate a completed iteration and, when a recurring gap or failure pattern shows up in an existing skill, propose a versioned update through an explicit approval gate.
---

When to Use: Called after atomic-iteration's Handoff step, or when the user explicitly asks to evaluate a skill.

When NOT to Use: One-off task issues, mid-iteration troubleshooting, or any skill edit the user didn't ask to be evaluated.

Core Workflow
1. Evaluate: Save outcome to `reference/ee/evaluation_[N].md` (under 100 words, bulleted metrics/outcomes). Present to user.
2. Detect Pattern: Check if this or prior evaluations show a recurring gap tied to an existing skill, not a one-off task issue.
3. Draft: If found, draft `.agents/skills/[skill-name]/SKILL_[n].md` (incrementing) with the fix applied. Present the diff against the current version.
4. Approve: Wait for explicit approval. Never edit the existing SKILL.md in place or save the draft unapproved.
5. Apply: On approval, save `SKILL_[n].md` and update `.agents/INSTRUCTIONS.md` to point to it. Commit and push (delegate to "semantic-git" for a PR; direct commit otherwise).
6. Decline Path: If declined or no response, discard the draft, keep the pointer as-is, log the observation only.