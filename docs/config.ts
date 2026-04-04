const modules = {
  home: { text: "首页", link: "/" },
  notes: { text: "学习笔记", link: "/notes" },
  projects: { text: "项目展示", link: "/projects" },
  interview: { text: "面试题库", link: "/interview" },
  readme: { text: "关于我", link: "/readme" },
};

export const noteSidebar = [
  {
    text: "前端",
    items: [
      {
        text: "HTML",
        link: `${modules.notes.link}/frontend/html`,
      },
      {
        text: "CSS",
        link: `${modules.notes.link}/frontend/css`,
      },
      {
        text: "JavaScript",
        link: `${modules.notes.link}/frontend/javascript`,
      },
      {
        text: "TypeScript",
        link: `${modules.notes.link}/frontend/typescript`,
      },
      {
        text: "Vue",
        link: `${modules.notes.link}/frontend/vue`,
      },
      {
        text: "React",
        link: `${modules.notes.link}/frontend/react`,
      },
      {
        text: "Webpack",
        link: `${modules.notes.link}/frontend/webpack`,
      },
      {
        text: "Canvas",
        link: `${modules.notes.link}/frontend/canvas`,
      },
    ],
  },
  {
    text: "后端",
    items: [
      {
        text: "MySQL 必知必会",
        link: `${modules.notes.link}/backend/mysql-crash-course`,
      },
    ],
  },
  {
    text: "工程化",
    items: [
      {
        text: "基于Docker的前端项目部署",
        link: `${modules.notes.link}/devops/deploy-fe`,
      },
      {
        text: "基于Docker的后端项目部署",
        link: `${modules.notes.link}/devops/deploy-be`,
      },
      {
        text: "基于Compose的前后端项目部署",
        link: `${modules.notes.link}/devops/deploy-compose`,
      },
    ],
  },
];

export const projectSidebar = [
  {
    text: "项目展示",
    link: `${modules.projects.link}`,
  },
];

export const interviewSidebar = [
  {
    text: "前端",
    items: [
      { text: "HTML", link: `${modules.interview.link}/frontend/html` },
      { text: "CSS", link: `${modules.interview.link}/frontend/css` },
      {
        text: "JavaScript",
        link: `${modules.interview.link}/frontend/javascript`,
      },
      {
        text: "TypeScript",
        link: `${modules.interview.link}/frontend/typescript`,
      },
      { text: "Vue", link: `${modules.interview.link}/frontend/vue` },
      { text: "React", link: `${modules.interview.link}/frontend/react` },
      { text: "Webpack", link: `${modules.interview.link}/frontend/webpack` },
      { text: "Vite", link: `${modules.interview.link}/frontend/vite` },
      { text: "Http", link: `${modules.interview.link}/frontend/http` },
      { text: "UniApp", link: `${modules.interview.link}/frontend/uniapp` },
      { text: "Other", link: `${modules.interview.link}/frontend/other` },
    ],
  },
  {
    text: "后端",
    items: [],
  },
];

export const sidebar = {
  [modules.notes.link]: noteSidebar,
  [modules.interview.link]: interviewSidebar,
};

export const navs = [
  {
    text: modules.home.text,
    link: modules.home.link,
  },
  {
    text: modules.notes.text,
    link: noteSidebar[0].items[0].link!,
  },
  {
    text: modules.interview.text,
    link: interviewSidebar[0].items[0].link!,
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
