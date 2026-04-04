import { defineConfig } from "vitepress";
import { navs, sidebar } from "../config";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shawn的博客",
  description:
    "Shawn的博客，记录我的技术成长。主要技术栈是 HTML5、CSS3、JavaScript、TypeScript、Vue、React、Node.js、Express、NestJS、Docker 等。",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  cleanUrls: true,
  lastUpdated: true,
  outDir: "./.vitepress/dist",

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: "/favicon.ico",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",

    search: {
      provider: "local",
    },

    outline: {
      level: 2,
      label: "页面导航",
    },

    nav: navs,

    sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/a5shawn" },
      // {
      //   icon: {
      //     svg: '<svg t="1717126851379" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1415" width="200" height="200"><path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m259.168-568.896h-290.752a25.28 25.28 0 0 0-25.28 25.28l-0.032 63.232c0 13.952 11.296 25.28 25.28 25.28h177.024a25.28 25.28 0 0 1 25.28 25.28v12.64a75.84 75.84 0 0 1-75.84 75.84h-240.224a25.28 25.28 0 0 1-25.28-25.28v-240.192a75.84 75.84 0 0 1 75.84-75.84h353.92a25.28 25.28 0 0 0 25.28-25.28l0.064-63.2a25.312 25.312 0 0 0-25.28-25.312H417.184a189.632 189.632 0 0 0-189.632 189.6v353.952c0 13.952 11.328 25.28 25.28 25.28h372.928a170.656 170.656 0 0 0 170.656-170.656v-145.376a25.28 25.28 0 0 0-25.28-25.28z" p-id="1416"></path></svg>',
      //   },
      //   link: "https://gitee.com/a5shawn",
      // },
    ],

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
        hourCycle: "h24",
      },
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    footer: {
      // message: "Released under the MIT License.",
      copyright:
        'Copyright © 2024-present <a href="https://github.com/a5shawn" target="_blank">Shawn Kang</a>',
    },
  },
});
