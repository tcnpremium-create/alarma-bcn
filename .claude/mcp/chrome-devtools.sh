#!/bin/sh
# Chrome DevTools MCP (performance traces, Lighthouse, network, console).
# Cloud containers: root user -> --no-sandbox; Chromium does not read HTTPS_PROXY
# by itself here, so pass it through when set.
if [ -x /opt/pw-browsers/chromium ]; then
  set -- --headless --isolated --executablePath=/opt/pw-browsers/chromium --chromeArg=--no-sandbox "$@"
  [ -n "$HTTPS_PROXY" ] && set -- "$@" "--chromeArg=--proxy-server=$HTTPS_PROXY"
  exec npx -y chrome-devtools-mcp@latest "$@"
fi
exec npx -y chrome-devtools-mcp@latest --isolated "$@"
