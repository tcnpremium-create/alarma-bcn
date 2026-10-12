#!/bin/sh
# Playwright MCP. In Claude Code cloud containers (root, bundled Chromium) the
# browser needs --no-sandbox and an explicit executable; locally the defaults work.
if [ -x /opt/pw-browsers/chromium ]; then
  exec npx -y @playwright/mcp@latest --headless --isolated --no-sandbox --executable-path /opt/pw-browsers/chromium "$@"
fi
exec npx -y @playwright/mcp@latest --isolated "$@"
