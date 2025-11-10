import '../../src/env'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'NodeJS Fullstack Template',
  description: 'Documentation for NodeJS Fullstack Template',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Home', link: '/' }],

    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/adophilus/templates' }
    ]
  },
  vite: {
    plugins: [tsconfigPaths()]
  }
})
