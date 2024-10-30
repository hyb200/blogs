import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'Zh-CN',
  title: "深夜小酒馆",
  base: '/blogs/',
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Redis',
        collapsed: true,
        items: [
          {text: "Redis 缓存是怎么工作的", link: '/'}
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ], 
 
      // // 文章翻页
      // docFooter: {
      //   prev: '上一篇',
      //   next: '下一篇'
      // },
  
      // // 移动端 - 外观
      // darkModeSwitchLabel: '外观',
  
      // // 移动端 - 返回顶部
      // returnToTopLabel: '返回顶部',
  
      // // 移动端 - menu
      // sidebarMenuLabel: '菜单',
  }
})
