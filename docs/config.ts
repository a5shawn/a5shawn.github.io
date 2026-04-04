import { getSidebarItems } from "./utils";

/**
 * 模块配置
 * 注意：模块key和link保持一致，方便后续使用模块key生成链接路径
 */
const modules = {
  home: { text: "首页", link: "/" },
  notes: { text: "学习笔记", link: "/notes" },
  projects: { text: "项目展示", link: "/projects" },
  interview: { text: "面试题库", link: "/interview" },
  readme: { text: "关于我", link: "/readme" },
};

/**
 * 学习笔记侧边栏配置
 */
export const noteSidebar = [
  {
    text: "前端",
    items: getSidebarItems("notes", "frontend", [
      { text: "HTML" },
      { text: "CSS" },
      { text: "JavaScript" },
      { text: "TypeScript" },
      { text: "Vue" },
      { text: "React" },
      { text: "Webpack" },
      { text: "Canvas" },
    ]),
  },
  {
    text: "后端",
    items: getSidebarItems("notes", "backend", [
      { text: "MySQL 必知必会", link: "mysql-crash-course" },
    ]),
  },
  {
    text: "工程化",
    items: getSidebarItems("notes", "devops", [
      { text: "基于Docker的前端项目部署", link: "deploy-fe" },
      { text: "基于Docker的后端项目部署", link: "deploy-be" },
      { text: "基于Compose的前后端项目部署", link: "deploy-compose" },
    ]),
  },
];

/**
 * 面试题库侧边栏配置
 */
export const interviewSidebar = [
  {
    text: "前端",
    items: getSidebarItems("interview", "frontend", [
      { text: "HTML" },
      { text: "CSS" },
      { text: "JavaScript" },
      { text: "TypeScript" },
      { text: "Vue" },
      { text: "React" },
      { text: "Webpack" },
      { text: "Vite" },
      { text: "Http" },
      { text: "UniApp" },
      { text: "Other" },
    ]),
  },
  {
    text: "后端",
    items: [],
  },
];

/**
 * 项目展示侧边栏配置
 */
export const projectSidebar = [
  {
    text: "项目展示",
    link: `${modules.projects.link}`,
  },
];

/**
 * 侧边栏配置
 */
export const sidebar = {
  [modules.notes.link]: noteSidebar,
  [modules.interview.link]: interviewSidebar,
};

/**
 * 顶部导航页签配置
 */
export const navs = [
  {
    text: modules.home.text,
    link: modules.home.link,
  },
  {
    text: modules.notes.text,
    link: noteSidebar[0].items[2].link,
  },
  {
    text: modules.interview.text,
    link: interviewSidebar[0].items[2].link,
  },
  {
    text: modules.projects.text,
    link: projectSidebar[0].link!,
  },
  {
    text: modules.readme.text,
    link: modules.readme.link,
  },
];
