---
name: atomic-iteration
description: Manage structured development iterations with a systematic workflow and a persistent state pointer.
---

Skill Rules & Triggers
- Trigger Skill When: Starting a new iteration, "iteration N" is mentioned, or proceeding with multi-step implementation planning.
- Do Not Trigger If: Answering general Q&A, doing a quick single bug fix without planning, starting a project chat without implementation work, or if explicitly opted-out by the user.
- Pro-Tips: Maintain context (goal, plan, state, branch) throughout. If ambiguous, ask direct multiple-choice questions. Record changed circumstances in STATE.

Project structure: skills, instructions, references
```
.agents/
├── STATE.md
├── INSTRUCTIONS.md
├── skills/<skill-name>/SKILL_[n].md
└── reference/
    ├── ifp/implementation_plan_[N].md
    └── ee/evaluation_[N].md
```

State Contract
- `.agents/STATE.md` is the mutable pointer for the current iteration; the user message overrides it if they conflict.
- The approved `reference/ifp/implementation_plan_[N].md` is immutable. Record changed circumstances only in STATE; do not rewrite or annotate the approved plan.
- Before implementation work, read STATE. Update it only after a task completion, status transition, decision, blocker, verification result, or handoff.
- Only the active implementation agent writes STATE. Commit state updates via "semantic-git" in Commit-Only Mode, bundled with the related plan or task changes; do not create empty progress-only commits.
- Required fields: Status, Iteration, Plan, Branch, Current task, Completed, Failed, Next action, Decisions, Blockers, Verification, and Updated.

Core Workflow
- Init Branch: Inspect branch and worktree state for this iteration.
- Context: Clarify goal & identify relevant files.
- Plan: Draft implementation plan with open questions.
- Approve: Iterate plan with user until "OK".
- Save: Save the immutable plan and initialize STATE.
- Execute: Create and run tasks sequentially upon approval.
- Handoff: Delegate commit, push, and PR to semantic-git.
- Evaluation: Delegate to skill-evolution.

Details

1. Branch Initialization
- Trigger: An iteration begins.
- Actions: Inspect the current branch and `git status --porcelain`. Do not pull, switch branches, stash, or commit automatically; request user direction before any of those actions.

2. Gather Context & Goal
- Trigger: Branch is ready.
- Action: Read `.agents/STATE.md` when it exists, then ask the user only if goal or files are not inferable from the conversation, state, or project files. If the user's request already states the goal and/or target files clearly, skip asking and proceed directly.
- Goal: If unclear, ask for a 1-2 sentence main goal.
- Files: If unclear, ask for target files. If user doesn't know, scan project using: `find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) -not -path "*/node_modules/*" -not -path "*/dist/*" | head -30`, read core files (`README.md`, `reference/ifp/implementation_plan_[N].md`), and confirm the list with the user.
- State Persistence: Read the `reference/ee/evaluation_[N-1].md` from the previous iteration (if any) to prevent regression and reuse previous architecture decisions.

3. Draft & Review Plan
- Trigger: Goal and reference files are clear.
- Action: Draft implementation plan and task following the format specified.
- Implementation Plan Format: Goal / Scope (max 1-2 days work checklist). Open Questions & Success Criteria (verifiable outcomes, phrased so each can become a test case if a test suite is added later). Files to Modify & Risks.
- Task Format: Define `Goal`, `Files`, and a detailed `Checklist` per task.
- Delivery: Share the implementation plan & task for user to review.
- Rules: Do not proceed to do ANY file changes, until user explicitly approves the implementation plan ("OK"/"Ready").

4. Save Plan & Initialize State
- Trigger: User approves the plan.
- Action: Check latest iteration index (`ls -la reference/ifp/implementation_plan_*.md`), save to `reference/ifp/implementation_plan_[N].md`, and update `README.md` focusing only on the new features. Initialize `.agents/STATE.md` with `Status: planned`, the iteration number, plan path, branch, first task, next action, and timestamp.
- Rules: After approval, do not edit the implementation plan. Present only the modified lines of README using standard git diff format (max 15 lines snippet). Wait for user approval, then commit README.md, implementation_plan_[N].md, and STATE.md together in a single "planning" commit via "semantic-git" in Commit-Only Mode. DO NOT START CODING UNTIL THE PLAN, README AND STATE ARE COMMITTED.

5. Execution
- Trigger: The approved plan and initialized state are committed locally.
- Rules: Before each task batch, read STATE and confirm the current task matches the immutable plan. Run tasks in small batches and update STATE after every required state transition.
- Auto-Format: Run `npx prettier --write` only on changed, supported files before verification.
- Auto-Verification (before manual review): Run `node --check` on changed `.js` files and `npx prettier --check` on changed, supported files. If a test suite exists, also run it against the task's Success Criteria (from step 3 plan). Only proceed to manual review once these pass. Treat a failure here as an error under `efficient-code`'s retry counter, not a separate review round.
- State Updates: On success, append the task to Completed, set the next task and Next action, and record verification, then commit the task changes and STATE update together via "semantic-git" in Commit-Only Mode. On a decision, add a concise Decision. On a failure, set Status to `blocked`, record the blocker and error summary, and preserve the worktree (do not commit a failed task).
- When auto-verification passes: set Status to `review`, present to user to review, and point user to the `index.html` file for manual verification.
- Context Budget: After each completed task, compress its detail into a 1-line status (e.g. `[DONE] Task 3: added filter logic`) instead of keeping full diffs/output in context. Only retain full detail for the task currently in progress and any [FAILED]/[BLOCKED] task's error log.
- Action: If changes are requested during review, set Status to `in_progress`, revise, and represent the changes to user until approval. If the user approves, proceed directly to step 6.
- Retry Handling: Errors during task execution are handled by "efficient-code" skill's retry counter (max 3x, single counter, not nested). If that counter is exhausted on a task: append the task as `[FAILED]` under Failed in STATE, record the error summary in Blockers, and halt for user input.
- Rollback Rule: On [FAILED], preserve all worktree changes and halt. Describe the affected files and request explicit user approval before any restore or discard action. If the failure blocks dependent tasks, mark those as [BLOCKED] in STATE instead of attempting them.

6. Handoff
- Trigger: User verifies local tests and approves execution results.
- Action: Set `STATE.md` Status to `complete`, record the final verification and next action, then delegate the entire commit, push, and PR process to the "semantic-git" skill (full Core Workflow, not Commit-Only Mode).
- Output: Summarize the completed task checklist, active branch name, and PR link.

7. Evaluation
- Trigger: Handoff (step 6) complete.
- Action: Delegate to the "skill-evolution" skill for evaluation and any skill update proposal. See that skill for the full workflow.
