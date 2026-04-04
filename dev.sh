#!/bin/sh
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"
cd "$(dirname "$0")"
exec node node_modules/.bin/next dev
