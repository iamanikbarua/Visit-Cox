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
json_ld() { # every <script type="application/ld+json"> block must be valid JSON
  node -e '
    const fs = require("fs"); let bad = 0, n = 0;
    for (const f of fs.readdirSync(".").filter((f) => f.endsWith(".html"))) {
      const re = /<script[^>]*type=["\x27]application\/ld\+json["\x27][^>]*>([\s\S]*?)<\/script>/gi;
      for (const m of fs.readFileSync(f, "utf8").matchAll(re)) {
        n++;
        try { JSON.parse(m[1]); } catch (e) { bad++; console.log(`${f}: ${e.message}`); }
      }
    }
    console.log(`${n} json-ld blocks, ${bad} invalid`); process.exit(bad ? 1 : 0);'
}
stray() {
  local f; f=$(find . -path ./.git -prune -o \( -name '*-e' -o -name '*.orig' -o -name '*.rej' -o -name '*.bak' -o -name '.DS_Store' \) -print)
  [ -z "$f" ] || { echo "$f"; return 1; }
}
secrets() { # public repo: no credentials in shipped or tracked files
  ! git grep -nIiE "(password|passwd|secret|api[_-]?key|token)['\"]?[[:space:]]*[:=][[:space:]]*['\"][^'\"]{6,}" -- ':!scripts/check.sh' ':!*.md'
}
tailwind_css() { # css/tailwind.css must equal a fresh `npm run build:css` (run `npm ci` once first)
  local old; old=$(mktemp) && cp css/tailwind.css "$old" || return 1
  if ! npm run --silent build:css >/dev/null 2>&1; then echo "build failed: run npm ci"; rm -f "$old"; return 1; fi
  if cmp -s "$old" css/tailwind.css; then rm -f "$old"; return 0; fi
  echo "css/tailwind.css was stale: rebuilt it, commit the change"; rm -f "$old"; return 1
}
step "js syntax" syntax
step "tests (node --test)" tests
step "local links and assets" local_refs
step "json-ld" json_ld
step "stray files" stray
step "no secrets" secrets
step "tailwind css fresh" tailwind_css
echo; printf '%-26s | %s\n' step result; printf '%-26s-+-%s\n' "--------------------------" ------
fail=0
for i in "${!names[@]}"; do printf '%-26s | %s\n' "${names[$i]}" "${results[$i]}"; [ "${results[$i]}" = pass ] || fail=1; done
exit $fail
