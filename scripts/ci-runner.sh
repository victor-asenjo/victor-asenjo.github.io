#!/usr/bin/env bash
# Choose where CI runs: the home laptop (free) or GitHub-hosted runners (Actions minutes).
#
#   scripts/ci-runner.sh status   show the current choice and whether the laptop answers
#   scripts/ci-runner.sh on       check the laptop over SSH, then route CI to it
#   scripts/ci-runner.sh off      route CI back to GitHub-hosted runners
#
# Needs: gh (logged in) and the SSH key below. Override with RUNNER_KEY / RUNNER_HOST / REPO.
set -euo pipefail

KEY="${RUNNER_KEY:-$HOME/.ssh/gh-runner}"
HOST="${RUNNER_HOST:-runner@192.168.1.169}"
REPO="${REPO:-victor-asenjo/victor-asenjo.github.io}"
SERVICE_GLOB="actions.runner.${REPO//\//-}.*"

ssh_cmd() { ssh -i "$KEY" -o BatchMode=yes -o ConnectTimeout=6 "$HOST" "$@"; }

laptop_ready() {
  # Reachable and the runner service for this repo is active.
  ssh_cmd "systemctl is-active --quiet '$SERVICE_GLOB' 2>/dev/null || systemctl list-units --state=active --no-legend '$SERVICE_GLOB' | grep -q ."
}

case "${1:-status}" in
  status)
    echo "CI_RUNNER = $(gh variable get CI_RUNNER --repo "$REPO" 2>/dev/null || echo '(unset: GitHub-hosted)')"
    if laptop_ready; then echo "laptop runner: online"; else echo "laptop runner: unreachable or not registered"; fi
    ;;
  on)
    if ! laptop_ready; then
      echo "Laptop runner is not reachable or not registered. Run scripts/register-runner.sh first." >&2
      exit 1
    fi
    gh variable set CI_RUNNER --repo "$REPO" --body '["self-hosted","portfolio"]'
    echo "CI now runs on the laptop."
    ;;
  off)
    gh variable delete CI_RUNNER --repo "$REPO" 2>/dev/null || true
    echo "CI now runs on GitHub-hosted runners."
    ;;
  *)
    echo "usage: $0 status|on|off" >&2
    exit 2
    ;;
esac
