#!/usr/bin/env bash
# One-time: register a GitHub Actions runner for this repository on the home laptop, as a systemd service.
# It lives in its own folder (~/actions-runner-portfolio) next to the runners for the other repositories.
#
#   scripts/register-runner.sh
#
# Needs: gh (logged in with admin access to the repo) and the SSH key below.
# Node is not required on the laptop: actions/setup-node downloads it into the runner's tool cache.
set -euo pipefail

KEY="${RUNNER_KEY:-$HOME/.ssh/gh-runner}"
HOST="${RUNNER_HOST:-runner@192.168.1.169}"
REPO="${REPO:-victor-asenjo/victor-asenjo.github.io}"
DIR="actions-runner-portfolio"

echo "Requesting a registration token for $REPO ..."
TOKEN="$(gh api -X POST "repos/$REPO/actions/runners/registration-token" --jq .token)"
VERSION="$(gh api repos/actions/runner/releases/latest --jq .tag_name | sed 's/^v//')"

# The token is short-lived and only goes over the SSH session's stdin, never into a command line.
printf '%s' "$TOKEN" | ssh -i "$KEY" -o BatchMode=yes "$HOST" bash -s -- "$REPO" "$DIR" "$VERSION" <<'REMOTE'
set -euo pipefail
repo="$1"; dir="$2"; version="$3"
read -r token
if [ -d "$HOME/$dir/.runner" ]; then echo "already registered in ~/$dir"; exit 0; fi
mkdir -p "$HOME/$dir" && cd "$HOME/$dir"
curl -fsSL -o runner.tar.gz "https://github.com/actions/runner/releases/download/v${version}/actions-runner-linux-x64-${version}.tar.gz"
tar xzf runner.tar.gz && rm runner.tar.gz
./config.sh --unattended --url "https://github.com/$repo" --token "$token" \
  --name "$(hostname)-portfolio" --labels portfolio --work _work --replace
sudo ./svc.sh install "$USER" && sudo ./svc.sh start
REMOTE

echo "Done. Switch CI to the laptop with: scripts/ci-runner.sh on"
