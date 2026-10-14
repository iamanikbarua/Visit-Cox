#!/usr/bin/env bash
# Runs every check, prints a summary table, exits 1 if any step failed.
set -uo pipefail
cd "$(dirname "$0")/.."
names=(); results=()
step() { # name cmd...
  local n=$1; shift; echo "== $n"
  if "$@"; then results+=(pass); else results+=(FAIL); fi
  names+=("$n")
}
syntax() { local f ok=0; for f in js/*.js tests/*.js; do node --check "$f" || ok=1; done; return $ok; }
tests() { node --test 'tests/*.test.js'; }
local_refs() { # every src/href to a local file in *.html must exist
  local bad
  bad=$(grep -ohE '(src|href)="[^"#]+' ./*.html | sed -E 's/^(src|href)="//; s/\?.*$//' |
    grep -vE '^(https?:|mailto:|tel:|data:|javascript:|//|whatsapp:)' | sort -u |
    while read -r p; do [ -e "$p" ] || echo "missing: $p"; done)
  [ -z "$bad" ] || { echo "$bad"; return 1; }
}
stray() {
  local f; f=$(find . -path ./.git -prune -o \( -name '*-e' -o -name '*.orig' -o -name '*.rej' -o -name '*.bak' -o -name '.DS_Store' \) -print)
  [ -z "$f" ] || { echo "$f"; return 1; }
}
secrets() { # public repo: no credentials in shipped or tracked files
  ! git grep -nIiE "(password|passwd|secret|api[_-]?key|token)['\"]?[[:space:]]*[:=][[:space:]]*['\"][^'\"]{6,}" -- ':!scripts/check.sh' ':!*.md'
}
step "js syntax" syntax
step "tests (node --test)" tests
step "local links and assets" local_refs
step "stray files" stray
step "no secrets" secrets
echo; printf '%-26s | %s\n' step result; printf '%-26s-+-%s\n' "--------------------------" ------
fail=0
for i in "${!names[@]}"; do printf '%-26s | %s\n' "${names[$i]}" "${results[$i]}"; [ "${results[$i]}" = pass ] || fail=1; done
exit $fail
