#!/bin/bash
set -euo pipefail

# Checks out the next commit (in chronological order) whose message starts
# with "solve--", relative to the current HEAD.

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree not clean. Commit or stash your changes first." >&2
  exit 1
fi

head_sha=$(git rev-parse HEAD)

# All commits on the current branch, oldest first.
mapfile -t all_shas < <(git log --reverse --format='%H')

head_index=-1
for i in "${!all_shas[@]}"; do
  if [[ "${all_shas[$i]}" == "$head_sha" ]]; then
    head_index=$i
    break
  fi
done

if [[ $head_index -eq -1 ]]; then
  echo "Current HEAD ($head_sha) is not on this branch's history." >&2
  exit 1
fi

next_sha=""
for ((i = head_index + 1; i < ${#all_shas[@]}; i++)); do
  sha="${all_shas[$i]}"
  message=$(git log -1 --format='%s' "$sha")
  if [[ "$message" == solve--* ]]; then
    next_sha="$sha"
    break
  fi
done

if [[ -z "$next_sha" ]]; then
  echo "No further solve-- commit found after HEAD." >&2
  exit 1
fi

echo "Switching to $(git log -1 --format='%h %s' "$next_sha")"
git checkout "$next_sha"
