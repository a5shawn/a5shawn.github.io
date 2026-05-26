# CLAUDE.md

本文件为 Claude Code（claude.ai/code）提供该仓库的上下文指导。

## 常用命令

- `npm run dev` — 启动 Vite 开发服务器
- `npm run build` — TypeScript 类型检查 + Vite 生产构建
- `npm run preview` — 本地预览生产构建
- `npm run deploy` — 触发 GitHub Pages 部署（push 到 main 或手动触发 workflow_dispatch）

## 架构说明

单页 React 19 + TypeScript 个人主页（无路由）。

### 组件结构

```
src/
  main.tsx            — 入口，将 <App /> 挂载到 #root
  App.tsx             — 根布局：IntersectionObserver 实现滚动渐入动效、背景光晕、侧边栏/主内容布局
  index.css           — 全部样式集中在一个文件（CSS 自定义属性、动画、响应式断点）
  components/
    Navigation.tsx    — 固定顶部导航栏（滚动检测、GitHub + Email 图标链接）
    Hero.tsx          — 侧边栏英雄区域（姓名、标语、简介）
    Experience.tsx    — 成长旅程（4 列网格展示职业阶段）
    TechStack.tsx     — 技术栈 2x2 网格，使用 react-icons 图标
    Footer.tsx        — 简洁页脚
```

### 设计系统

所有设计 token 集中在 `:root`（index.css）的 CSS 自定义属性中。暗色主题（霓虹终端/赛博风格）。大屏双栏布局（`360px 侧边栏 + 主区域`），移动端单栏。Google Fonts: Plus Jakarta Sans（展示字体）+ JetBrains Mono（代码字体）。通过 CSS 类切换实现滚动驱动的淡入动效。

### 依赖

- React 19、react-icons 5.6
- Vite 6（构建工具）、TypeScript 5.7、Playwright 1.60

### 部署

GitHub Actions 工作流（`.github/workflows/deploy.yml`）：push 到 main 分支时自动构建并部署到 GitHub Pages。使用 `actions/upload-pages-artifact` + `actions/deploy-pages`。
