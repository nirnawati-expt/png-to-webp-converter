---
name: atomic-iteration
description: Manage structured development iterations with a systematic workflow. Executes atomic, broken-down changes.
---

Skill Rules & Triggers
- Trigger Skill When: Starting new project chats, "iteration N" is mentioned, updating code files, or when proceeding with implementation.
- Do Not Trigger If: Answering general Q&A, doing a quick single bug fix without planning, or if explicitly opted-out by the user.
- Pro-Tips: Maintain context (goal, plan, branch) throughout. If ambiguous, ask direct multiple-choice questions. Document any mid-iteration plan changes under a `## Changes from Original Plan` section.

Core Workflow
- Init Branch: Prepare branch for this iteration.
- Context: Clarify goal & identify relevant files.
- Plan: Draft implementation plan with open questions.
- Approve: Iterate plan with user until "OK".
- Save: Save plan to markdown & commit.
- Execute: Create and run tasks sequentially upon approval.
- Handoff: Delegate commit, push, and PR to semantic-git.
- Evaluation: Delegate to skill-evolution.

Details

1. Branch Initialization
- Trigger: New chat in a project.
- Actions: Pull from main branch.

2. Gather Context & Goal
- Trigger: Branch is ready.
- Action: Ask the user only if goal or files are not inferable from the conversation or project files. If the user's request already states the goal and/or target files clearly, skip asking and proceed directly.
- Goal: If unclear, ask for a 1-2 sentence main goal.
- Files: If unclear, ask for target files. If user doesn't know, scan project using: `find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) -not -path "*/node_modules/*" -not -path "*/dist/*" | head -30`, read core files (`README.md`, `reference/ifp/implementation_plan_[N].md`), and confirm the list with the user.
- State Persistence: Read the `reference/ee/evaluation_[N-1].md` from the previous iteration (if any) to prevent regression and reuse previous architecture decisions.

3. Draft & Review Plan
- Trigger: Goal and reference files are clear.
- Action: Draft implementation plan and task following the format specified.
- Implementation Plan Format: Goal / Scope (max 1-2 days work checklist). Open Questions & Success Criteria (verifiable outcomes, phrased so each can become a test case if a test suite is added later). Files to Modify & Risks.
- Task Format: Define `Goal`, `Files`, and a detailed `Checklist` per task.
- Delivery: Share the implementation plan & task for user to review.
- Rules: Do not proceed to do ANY file changes, until user explicitly approves the implementation plan ("OK"/"Ready")

4. Save & Commit Plan
- Trigger: User approves the plan.
- Action: Check latest iteration index (`ls -la reference/ifp/implementation_plan_*.md`), save to `reference/ifp/implementation_plan_[N].md`. Update `README.md` focusing only on the new features.
- Rules: Present only the modified lines of README using standard git diff format (max 15 lines snippet). Wait for user approval before committing locally. DO NOT START CODING UNTIL COMMITTED.

5. Execution
- Trigger: `reference/ifp/implementation_plan_[N].md` and `README.md` approved by user and finished committed locally.
- Rules: Run tasks in small batches. Update progress inline, shortly straight to the point.
- Auto-Format: Run `npx prettier . --write` on changed files to auto-fix formatting, before verification.
- Auto-Verification (before manual review): Run `node --check` on changed `.js` files and `npx prettier . --check` to confirm formatting is clean. If a test suite exists, also run it against the task's Success Criteria (from step 3 plan). Only proceed to manual review once these pass. Treat a failure here as an error under efficient-code's retry counter, not a separate review round.
- When auto-verification passes: present to user to review. Point user to the `index.html` file for manual verification.
- Context Budget: After each completed task, compress its detail into a 1-line status (e.g. `[DONE] Task 3: added filter logic`) instead of keeping full diffs/output in context. Only retain full detail for the task currently in progress and any [FAILED]/[BLOCKED] task's error log.
- Action: If changes are requested during review, revise and represent the changes to user, until get the approval. If user approves, proceed directly to step 6.
- Retry Handling: Errors during task execution are handled by "efficient-code" skill's retry counter (max 3x, single counter, not nested). If that counter is exhausted on a task: Mark that task as [FAILED] in `reference/ifp/implementation_plan_[N].md`, write the error log under "## Changes from Original Plan", and halt for user input.
- Rollback Rule: On [FAILED], revert that task's file changes to the last committed state (`git checkout -- <files>` for the affected files only) before halting. Do not carry partial/broken code into the next task or commit. If the failure blocks dependent tasks, mark those as [BLOCKED] instead of attempting them.

6. Handoff
- Trigger: User verifies local tests, approves execution results.
- Action: Delegate the entire commit, push, and PR process to the "semantic-git" skill. Do not commit directly in this step, semantic-git owns commit ownership end to end.
- Output: Summarized the completed task checklist, active branch name, and PR link.

7. Evaluation
- Trigger: Handoff (step 6) complete.
- Action: Delegate to the "skill-evolution" skill for evaluation and any skill update proposal. See that skill for the full workflow.