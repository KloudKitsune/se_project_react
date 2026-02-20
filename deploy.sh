#!/usr/bin/env bash
set -euo pipefail
# Usage: ./deploy.sh [path-to-ssh-key]
# Example: ./deploy.sh ~/.ssh/id_ed25519

KEY=${1:-$HOME/.ssh/id_ed25519}
REMOTE_USER="corbansmith92"
REMOTE_HOST="api.wtwr.txtlet.org"
REMOTE_PATH="/home/corbansmith92/se_project_express/frontend"

cd "$(dirname "$0")"

echo "Installing dependencies..."
npm ci

echo "Building frontend..."
npm run build

# Start ssh-agent if not running (best-effort)
if ! pgrep -x "ssh-agent" >/dev/null 2>&1; then
  eval "$(ssh-agent -s)"
fi

echo "Adding SSH key: $KEY"
ssh-add "$KEY" || true

echo "Copying files to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
scp -i "$KEY" -r ./dist/* "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"

echo "Deploy finished."
