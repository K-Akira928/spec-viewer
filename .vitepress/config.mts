import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",

  title: "SpecViewer",
  description: "設計書を閲覧するためのサイトです",

  vite: {
    plugins: [tailwindcss()]
  }
})
