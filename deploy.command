#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
command -v node >/dev/null || { echo '请先安装 Node.js 22 或更新版本：https://nodejs.org'; exit 1; }
command -v npm >/dev/null || { echo '未找到 npm，请安装完整 Node.js。'; exit 1; }
node -e 'if(Number(process.versions.node.split(".")[0])<22)process.exit(1)' || { echo '需要 Node.js 22 或更新版本。'; exit 1; }
mkdir -p .runtime
if [ ! -x node_modules/.bin/tokscale ] || [ ! -f .runtime/installed-lock ] || ! cmp -s package-lock.json .runtime/installed-lock; then
  echo '安装锁定版本的官方 Tokscale 引擎…'
  npm ci --no-audit --no-fund
  cp package-lock.json .runtime/installed-lock
fi
npm run build
node launcher.mjs
