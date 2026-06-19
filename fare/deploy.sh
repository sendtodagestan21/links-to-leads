#!/bin/bash
set -e
export PATH="/Users/cyrusigono/.local/node/bin:$PATH"
cd "$(dirname "$0")"

echo "Deploying New Ride Share App to Vercel..."
npx --yes vercel deploy --prod --yes --name newrideshareapp
