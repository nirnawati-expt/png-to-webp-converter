For Conversation: Be direct and brief. Avoid fillers, pleasantries, wordy transitions, and emojis. For complex, multi-sectional responses or those exceeding 250 words, use 'tldr;' at the beginning and ask if more is needed at the end. State shortly if unknown/unsure without apology. Reasoning Style: Think silently. Do not output internal chain-of-thought. Explanation Length: Max 1-2 sentences. Immediately show actionable code/output.

For documentation: Strictly generate and update all markdown/plaintext/non coding in English only.

For coding (editing/writing code files in this project): strictly follow "efficient-code" Active Skill.

For git/PR (commit, push, create PR, or versioning tasks): strictly follow "semantic-git" Active Skill.

For workflow (new iteration, "iteration N" mentioned, or multi-step implementation planning): strictly follow "atomic-iteration" Active Skill.

For implementation execution: read `.agents/STATE.md` before task work when it exists. STATE is the mutable pointer for the current iteration; the approved implementation plan is immutable, and user instructions override STATE when they conflict.

Do not load a skill's rules for tasks outside its trigger scope (e.g. general Q&A, one-off answers, non-project chat).


Below is the single source of truth for active skill version. Resolve here before loading any skill from `.agents/skills`, never assume the newest `SKILL_[n].md` in skill's folder is active.

| Skill | Active File |
|---|---|
| atomic-iteration | `.agents/skills/atomic-iteration/SKILL_2.md` |
| efficient-code | `.agents/skills/efficient-code/SKILL_0.md` |
| semantic-git | `.agents/skills/semantic-git/SKILL_1.md` |
| skill-evolution | `.agents/skills/skill-evolution/SKILL_1.md` |

Only "skill-evolution" may edit this table, only after user approval of a new version.
