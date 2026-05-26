# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在本仓库操作时提供指引。

## 构建与开发命令

```sh
npm run dev       # 启动 Vite 开发服务器
npm run build     # TypeScript 检查 + 生产构建 (tsc -b && vite build)
npm run preview   # 本地预览生产构建
```

- TypeScript: 严格模式，启用 `noUnusedLocals` 和 `noUnusedParameters` — 未使用的变量/参数会导致构建失败。
- `vite.config.ts`: `base: '/'` — 部署到 GitHub Pages 根域名 (`a5shawn.github.io`)。

## 项目结构

```
src/
  App.tsx               # 根组件 — 双栏网格布局 (sidebar + main-content)，滚动渐入观察器
  index.css             # 全部样式 — CSS 自定义属性，约 600 行
  main.tsx              # React 19 入口
  vite-env.d.ts
  components/
    Navigation.tsx      # 固定顶部导航栏 — logo 图片 + 标语
    Hero.tsx            # 侧边栏内容 — 徽章、标题、简介、姓名、社交链接
    Experience.tsx      # 经历条 — 4 列网格展示职业步骤卡片
    TechStack.tsx       # 2×2 技术网格 — 带品牌色 SVG 图标的卡片 (react-icons/si)
    Footer.tsx          # 简洁底部页脚
```

## 架构说明

- **单页个人作品集** — React 19 + TypeScript + Vite 6，无路由。
- **双栏仪表盘布局** — 固定侧边栏 (360px) + 主内容区 (1fr)，最大宽度 1320px 容器。
- **所有样式集中在一个 CSS 文件** (`src/index.css`) — 使用 CSS 自定义属性主题化 (`--bg-primary`、`--accent-cyan` 等)。无 CSS Modules 或 CSS-in-JS。
- **滚动动画** — App.tsx 中的 `IntersectionObserver` 为元素添加 `.visible` 类，触发 CSS 中定义的渐入过渡。
- **技术图标** — `react-icons/si` (Simple Icons) 提供带品牌色的 SVG 图标。图标映射定义在 `TechStack.tsx` 中，通过 `color` 属性设置品牌色。
- **部署** — GitHub Actions 工作流 (`.github/workflows/deploy.yml`) 在推送到 `main` 时构建，通过 `actions/deploy-pages@v4` 部署到 GitHub Pages。

## 设计令牌 (src/index.css)

- 深色主题: `--bg-primary: #0f172a`，`--bg-secondary: #1e293b`
- 强调色: 青色 (`#22d3ee`)、蓝色、紫色、粉色
- 字体: Plus Jakarta Sans (展示)、JetBrains Mono (代码)
- 响应式断点: 860px (单栏)、640px、400px
