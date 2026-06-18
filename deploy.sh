#!/bin/bash
set -e
export PATH="/Users/cyrusigono/.local/node/bin:$PATH"
cd "$(dirname "$0")"

echo "Deploying Links to Leads to Vercel..."
npx --yes vercel deploy --prod --yes --name links-to-leads
