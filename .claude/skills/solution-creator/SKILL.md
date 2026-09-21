---
name: solution-creator
description: helps to place workshop solutions in the right order and spot
---

# SKILL.md

- If not present, ask what solution should be created.
  - Ask for the learning outcome for the workshop attendees
  - Ask for the scope of the solution
  - Aks where the solution should be placed
    - List all solution--Commits (all commits starting with `solution--`) to help the trainer to choose the correct spot: `git log --oneline solution-next 2>/dev/null | grep "solution--" || git log --oneline --all | grep "solution--"`
- Consult `/angular-developer`-Skill for best practices before you start coding
- Apply new solutions or solution-changes by running an interactive rebase:
  - `git checkout solution`
  - `git rebase main -i`
