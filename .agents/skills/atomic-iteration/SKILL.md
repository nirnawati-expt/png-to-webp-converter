---
name: atomic-iteration
description: Manage structured development iterations with a systematic workflow. Executes atomic, broken-down changes.
---

Skill Rules & Triggers
- Trigger Skill When: Starting new project chats, "iteration N" is mentioned, updating code files, or when proceeding with implementation.
- Do Not Trigger If: Answering general Q&A, doing a quick single bug fix without planning, or if explicitly opted-out by the user.
- Pro-Tips: Maintain context (goal, plan, branch) throughout. If ambiguous, ask direct multiple-choice questions. Document any mid-iteration plan changes under a `## Changes from Original Plan` section.

Core Workflow
1. Init Branch: Prepare branch for this iteration.
2. Context: Clarify goal & identify relevant files.
3. Plan: Draft implementation plan with open questions.
4. Approve: Iterate plan with user until "OK".
5. Save: Save plan to markdown & commit.
6. Execute: Create and run tasks sequentially upon approval.
7. Finalize: Delegate to semantic-git, create summary.

1. Branch Initialization
- Trigger: New chat in a project.
- Actions: Pull from main branch.

2. Gather Context & Goal
- Trigger: Branch is ready.
- Action: If goals and files are unclear, ask user for clues.
- Goal: Ask for a 1-2 sentence main goal if unclear.
- Files: Ask for target files. If user doesn't know, scan project using: `find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) -not -path "*/node_modules/*" -not -path "*/dist/*" | head -30`, read core files (`README.md`, `implementation_plan_[N].md`), and confirm the list with the user.
- State Persistence: Read the `evaluation_[N-1].md` from the previous iteration (if any) to prevent regression and reuse previous architecture decisions.

3. Draft & Review Plan
- Trigger: Goal and reference files are clear.
- Action: Draft implementation plan and task following the format specified.
- Implementation Plan Format: Goal / Scope (max 1-2 days work checklist). Open Questions & Success Criteria (verifiable outcomes). Files to Modify & Risks.
- Task Format: Define `Goal`, `Files`, and a detailed `Checklist` per task.
- Delivery: Share the implementation plan & task for user to review. 
- Rules: Do not proceed to do ANY file changes, until user explicitly approves the implementation plan ("OK"/"Ready")

4. Save & Commit Plan
- Trigger: User approves the plan.
- Action: Check latest iteration index (`ls -la implementation_plan_*.md`), save to `implementation_plan_[N].md`. Update `README.md` focusing only on the new features. 
- Rules: Present only the modified lines of README using standard git diff format (max 15 lines snippet). Wait for user approval before committing locally. DO NOT START CODING UNTIL COMMITTED.

5. Execution
- Trigger: `implementation_plan_[N].md` and `README.md` approved by user and finished committed locally.
- Rules: Run tasks in small batches. Update progress inline, shortly straight to the point. When done present to user to review. Point user to the `index.html` file for manual verification.
- Action: If changes are requested during review, revise and represent the changes to user, until get the approval. If user approves, proceed directly to step 6.
- If Max Retry 3 times fails: Mark the current task as [FAILED] in implementation_plan_[N].md, write the error log under "## Changes from Original Plan", and halt for user input.

6. Finalize & Handoff
- Trigger: User verifies local tests, approve execution results.
- Action: Evaluate current iteration, save to `evaluation_[N].md` (Strictly under 100 words using a bulleted list of metrics/outcomes). Delegate the entire commit, push, and PR process to the "semantic-git" skill.
- Output: Summarized the completed task checklist, active branch name, and PR link.