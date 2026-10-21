#!/usr/bin/env bash
set -euo pipefail

# Recreates all solution tags from the commit messages on the solution branch
# and reports "wrong" tags that lead to broken diffs in the classroom.
# Works with the bash 3.2 that ships with macOS.
#
# Usage:
#   tools/recreate-tags.sh             check, recreate and push all tags
#   tools/recreate-tags.sh --dry-run   only report, change nothing
#   tools/recreate-tags.sh --prune     additionally delete stale remote tags
#
# Rule for solution commit messages (the tag name is the commit message):
#   solution--<topic>[-<part>...]
#   - starts with "solution--" (two dashes)
#   - segments are separated by a single "-"
#   - only letters and digits per segment, camelCase is allowed
#   - the first segment starts with a lowercase letter
#   - only the first line counts, trailers may follow after an empty line
#   Examples: solution--service, solution--router-guards-canMatch

prefix='solution--'
branch='solution'
base='main'
remote='origin'
valid_re="^${prefix}[a-z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$"
# Messages that look like a solution commit but miss the exact prefix.
lookalike_re='^(solution|solve)([-_ ]|$)'

dry_run=false
prune=false
for arg in "$@"; do
  case $arg in
    --dry-run) dry_run=true ;;
    --prune) prune=true ;;
    *) echo "Unknown option: $arg" >&2; exit 2 ;;
  esac
done

errors=0
error() { echo "ERROR: $*" >&2; errors=$((errors + 1)); }
warn() { echo "WARN:  $*" >&2; }

git fetch --quiet "$remote" "$branch" "$base"

# --- 1. validate the commit messages on the solution branch -------------
tags=()
shas=()

# Prints the sha of a tag that was collected before, or nothing.
sha_of() {
  local i
  for ((i = 0; i < ${#tags[@]}; i++)); do
    if [[ ${tags[i]} == "$1" ]]; then
      echo "${shas[i]}"
      return
    fi
  done
}

while IFS=' ' read -r sha subject; do
  lower=$(printf '%s' "$subject" | tr '[:upper:]' '[:lower:]')
  if [[ $subject =~ $valid_re ]]; then
    existing=$(sha_of "$subject")
    if [[ -n $existing ]]; then
      error "duplicate solution commit '$subject' ($existing and $sha)"
      continue
    fi
    tags+=("$subject")
    shas+=("$sha")
  elif [[ $subject == "$prefix"* ]]; then
    error "$sha '$subject' does not follow the naming rule solution--<topic>[-<part>...]"
  elif [[ $lower =~ $lookalike_re ]]; then
    error "$sha '$subject' looks like a solution commit but does not start with '$prefix'"
  fi
done < <(git log --reverse --format='%h %s' "$remote/$base..$remote/$branch")

if ((errors > 0)); then
  echo "Fix the commit messages above (git rebase -i, 'reword') and run the script again." >&2
  exit 1
fi

# --- 2. compare with the tags that exist on the remote ------------------
stale=()
while read -r remote_sha ref; do
  tag=${ref#refs/tags/}
  local_sha=$(sha_of "$tag")
  if [[ -z $local_sha ]]; then
    stale+=("$tag")
  elif [[ ${remote_sha:0:7} != "${local_sha:0:7}" ]]; then
    echo "moved:   $tag (${remote_sha:0:7} -> ${local_sha:0:7})"
  fi
done < <(git ls-remote --tags --refs "$remote" "refs/tags/${prefix}*")

for ((i = 0; i < ${#tags[@]}; i++)); do
  if ! git ls-remote --exit-code --tags --refs "$remote" "refs/tags/${tags[i]}" >/dev/null; then
    echo "new:     ${tags[i]}"
  fi
done

if ((${#stale[@]} > 0)); then
  for tag in "${stale[@]}"; do
    if $prune; then
      warn "stale remote tag '$tag' has no commit on '$branch' anymore and will be deleted"
    else
      warn "stale remote tag '$tag' has no commit on '$branch' anymore (use --prune to delete it)"
    fi
  done
fi

if $dry_run; then
  echo "Dry run: ${#tags[@]} solution tags checked, nothing changed."
  exit 0
fi

# --- 3. recreate and push -----------------------------------------------
git tag --list "${prefix}*" | xargs git tag -d >/dev/null 2>&1 || true
refs=()
for ((i = 0; i < ${#tags[@]}; i++)); do
  git tag "${tags[i]}" "${shas[i]}"
  refs+=("refs/tags/${tags[i]}")
done

# Push all (re-)created tags in a single network round-trip, overwriting
# remote tags of the same name.
git push --force "$remote" "${refs[@]}"

if $prune && ((${#stale[@]} > 0)); then
  stale_refs=()
  for tag in "${stale[@]}"; do
    stale_refs+=("refs/tags/$tag")
  done
  git push "$remote" --delete "${stale_refs[@]}"
fi

echo "Done: ${#tags[@]} solution tags pushed."
