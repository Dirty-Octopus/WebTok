# Tokscale Local Web GUI

个人本地 AI 编程用量面板，直接调用 [Tokscale](https://github.com/junhoyeo/tokscale) 官方 CLI（锁定版本 4.19.1）读取本机记录。无需账号或数据库。

## 一键部署 / 启动

需要 Node.js 22+（包含 npm）。macOS 双击 `deploy.command`，或终端运行：

```bash
./deploy.command
```

首次运行安装 package-lock.json 锁定的依赖，启动后台服务并打开浏览器。默认端口 4317，若被占用自动顺延，始终排除 8000/8888。只绑定 127.0.0.1。重复执行会复用已运行实例；关闭终端不会停止服务。未配置开机自启，重启电脑后重新双击即可。

```bash
npm run stop              # 停止后台服务
PORT=4567 ./deploy.command # 首次启动时指定首选端口
NO_OPEN=1 ./deploy.command # 不打开浏览器
npm start                 # 前台运行，Ctrl+C 停止
npm test                  # 服务、真实报告及端口冲突验证
```

服务信息与日志保存在 `.runtime/`，不纳入 Git。不要同时运行前台与后台实例。

## 功能

- Material 3 Expressive 界面，官方 Material Web 控件、本地字体与动态配色
- 独立 Dashboard / 用量分析 / 活动记录 / 模型明细 / 设置页面
- Dashboard 模块添加、隐藏和顺序调整，当前浏览器自动保存
- 浅色 / 深色 / 跟随系统，六种种子色与自定义颜色
- 自动 K/M/B、万/亿，固定 M/百万/B/亿、完整数字，0–3 位小数
- 预选最近活跃日期及模型，悬停或键盘聚焦显示精确数值，点击固定选择
- 手机底部导航与响应式布局
- 近 7 天、30 天、本月、全部、自定义日期，客户端筛选
- Token、估算费用、消息数、活跃天数
- 每日 Token / 费用趋势，过去 365 天热力图，日期点击详情
- 客户端分布与模型明细，模型搜索及费用 / Token / 消息排序
- JSON 导出当前日期及客户端筛选结果
- 真实扫描警告、加载及失败状态；一分钟内复用扫描结果

日期遵循运行机器的本地时区。所有统计来自官方 `tokscale graph` 输出；不自行重写会话解析。输入、输出、缓存读取、缓存写入、推理计入总 Token，统计口径与官方 graph 报告一致。费用是上游模型价格估算，可能使用定价缓存或联网获取公开价格，不代表订阅实际账单。未知价格及缺失日志可能导致不完整。不会调用 submit 上传用量。

支持哪些客户端取决于已安装引擎和本地记录。Cursor、Trae 等依赖上游账号同步缓存的客户端，需自行使用官方 CLI 登录 / 同步；此 GUI 不处理凭据，不包含排行榜、账号管理和上游全部 TUI 功能。

前后端不使用 CDN、远程字体或第三方图表服务。前端原生 HTML/CSS/JS + 官方 Material Web，esbuild 本地打包；后端 Node.js 标准库。API 仅提供聚合报告，不返回原始对话文本。

## 前端开发

编辑 `src/app.js` / `src/data.mjs` 或 `public/style.css` 后执行 `npm run build`，刷新浏览器即可。一键脚本每次都会构建前端。设计实现及单位换算说明见 `DESIGN.md`。
