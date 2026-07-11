---
name: atomic-iteration
description: Manage structured development iterations with a systematic workflow. Executes atomic, broken-down changes.
---

# Atomic Iteration

Structured development workflow for systematic, flexible changes.

## Core Workflow
1. Init Branch: Prepare branch for this iteration.
2. Context: Clarify goal & identify relevant files.
3. Plan: Draft implementation plan with open questions.
4. Approve: Iterate plan with user until "OK".
5. Save: Save plan to markdown & commit.
6. Execute: Create and run tasks sequentially upon approval.
7. Finalize: Commit, push, create PR, and summarize.

## 1. Branch Initialization
Trigger: New chat in a project.

Actions: If worktree branch undefined do `git fetch origin main && git checkout -b [branch-name] origin/main`. Else `git pull origin main`.

## 2. Gather Context & Goal
Trigger: Branch is ready.
* Goal: Ask for a 1-2 sentence main goal if unclear. *Wait for response.*
* Files: Ask for target files. If unknown, scan project (`find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) | head -50`), read core files (`README.md`, `package.json`), and confirm the list with the user. *Wait for confirmation.*

## 3. Draft & Review Plan
Trigger: Goal and reference files are clear.
* Goal / Scope (max 1-2 days work checklist)
* Open Questions & Success Criteria (verifiable outcomes)
* Files to Modify & Risks
* Task Format: Define `Goal`, `Files`, and a detailed `Checklist` per task.

Delivery: Share the implementation plan & task for user to review. 
* Do not proceed to do file changes, until user explicitly approves the implementation plan ("OK"/"Ready")

## 4. Save & Commit Plan
Trigger: User approves the plan.
* Action: Check latest iteration index (`ls -la implementation_plan_*.md`), save to `implementation_plan_[N].md`, and automatically commit locally:
  ```bash
  git add implementation_plan_[N].md
  git commit -m "docs(plan): implementation plan iteration [N]"
  ```
* Action: check `README.md` and update the content adjusting with current implementation plan. Present the changes to user to review.
* Wait for user approval of README.md before committing the changes locally.


## 5. Execution
Trigger: User says "proceed/yes".
* Execution: Run tasks in small batches. Update progress inline, shortly straight to the point. When done present to user to review.
* Review: If user approves, run commit and push to branch, before push to branch ensure pull from main branch. Create a Pull Request to `main`. If changes are requested, revise before committing.

## 6. Finalize & Handoff
Trigger: All tasks complete.
* Checklist: Verify local tests result by user's response, check for broken syntax, ensure `implementation_plan_[N].md` matches final outputs, and push all commits.
* Summary: Provide the completed task checklist, active branch name, and PR link.

## Rules & Triggers
* Trigger Skill When: Starting new project chats, "iteration N" is mentioned, updating code files, or when proceeding with implementation.
* Do Not Trigger If: Answering general Q&A, doing a quick single bug fix without planning, or if explicitly opted-out by the user.
* Pro-Tips: Maintain context (goal, plan, branch) throughout. If ambiguous, ask direct multiple-choice questions. Document any mid-iteration plan changes under a `## Changes from Original Plan` section.