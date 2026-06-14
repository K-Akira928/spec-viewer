<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useData, useRoute } from 'vitepress'
import Home from './Home.vue'
import SectionList from './SectionList.vue'
import Doc from './Doc.vue'
import DepsMap from './DepsMap.vue'
import SearchPalette from './SearchPalette.vue'
import { sections as navSections } from './docs-data'

// https://vitepress.dev/reference/runtime-api#usedata
// isDark は VitePress が管理する書き込み可能 ref。書き換えると <html>.dark と localStorage が連動する
const { frontmatter, isDark } = useData()
const route = useRoute()

function toggleDark() {
  isDark.value = !isDark.value
}

// 現在の第1階層セグメント（'api' / 'ui' / 'guide'）。route.path から導出
const activeSegment = computed(() => {
  const seg = route.path.split('/')[1] || ''
  return seg
})

// 検索パレット開閉（⌘K / Ctrl+K で起動）
const searchOpen = ref(false)
function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchOpen.value = true
  }
}
onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKeydown))
</script>

<template>
  <div class="font-sans antialiased text-slate-700 bg-white dark:text-slate-300 dark:bg-slate-900 min-h-screen flex flex-col">

    <!-- Header（確定版: API / 画面 / ガイド ＋ インライン検索・ダークモード・GitHub） -->
    <header class="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-900/85 backdrop-blur">
      <div class="mx-auto max-w-7xl px-6 h-16 flex items-center gap-6">
        <a href="/" class="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 shrink-0">
          <span class="grid place-items-center w-7 h-7 rounded-lg bg-brand-600 text-white text-sm">S</span>
          SpecViewer
        </a>
        <nav class="hidden md:flex items-center gap-1 text-sm">
          <a
            v-for="n in navSections"
            :key="n.key"
            :href="n.navHref"
            :class="activeSegment === n.key
              ? 'px-3 py-1.5 rounded-md font-medium text-slate-900 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'
              : 'px-3 py-1.5 rounded-md font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >{{ n.label }}</a>
        </nav>
        <div class="ml-auto flex items-center gap-2.5">
          <!-- インライン検索（⌘K でフォーカス — 機能は後段） -->
          <button
            type="button"
            @click="searchOpen = true"
            class="hidden sm:flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 w-56 lg:w-64 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600"
            aria-label="設計書を検索"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            <span>設計書を検索…</span>
            <kbd class="ml-auto border rounded px-1.5 py-0.5 text-[10px] bg-slate-50 dark:bg-slate-800 dark:border-slate-700">⌘K</kbd>
          </button>
          <!-- ダークモード切替 -->
          <button
            type="button"
            @click="toggleDark"
            class="grid place-items-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            :title="isDark ? 'ライトモードへ切替' : 'ダークモードへ切替'"
            :aria-label="isDark ? 'ライトモードへ切替' : 'ダークモードへ切替'"
          >
            <!-- ライト時: 月（ダークへ切替） -->
            <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
            <!-- ダーク時: 太陽（ライトへ切替） -->
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></svg>
          </button>
          <!-- GitHub -->
          <a href="#" class="hidden sm:grid place-items-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400" title="GitHub" aria-label="GitHub">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>
          </a>
          <!-- モバイル: ハンバーガー（機能は後段） -->
          <button type="button" class="md:hidden grid place-items-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400" aria-label="メニュー">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Body -->
    <Home v-if="frontmatter.home" />
    <SectionList v-else-if="frontmatter.layout === 'section'" :section="frontmatter.section" />
    <DepsMap v-else-if="frontmatter.layout === 'deps'" />
    <Doc v-else />

    <!-- Footer -->
    <footer class="border-t border-slate-100 dark:border-slate-800 mt-16">
      <div class="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-400 dark:text-slate-500 flex flex-col sm:flex-row gap-3 justify-between">
        <p>© 2026 SpecViewer — 社内仕様書ポータル</p>
        <div class="flex gap-5">
          <a href="#" class="hover:text-slate-600 dark:hover:text-slate-300">ガイドライン</a>
          <a href="#" class="hover:text-slate-600 dark:hover:text-slate-300">リポジトリ</a>
          <a href="#" class="hover:text-slate-600 dark:hover:text-slate-300">お問い合わせ</a>
        </div>
      </div>
    </footer>

    <!-- 検索パレット（⌘K / ヘッダー検索ボタンで起動） -->
    <SearchPalette v-if="searchOpen" @close="searchOpen = false" />

  </div>
</template>
