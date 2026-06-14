<script setup lang="ts">
// セクションサイドバー（セクション一覧・doc 画面で共有）。
// DESIGN.md §7: 現セクションのツリー（サブカテゴリ → 文書）＋他セクション＋全体折たたみ（« / Ctrl+B）
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'
import { sectionMeta, sections, subcategoriesOf } from './docs-data'

const props = defineProps<{ section: string }>()

const route = useRoute()
const meta = computed(() => sectionMeta(props.section))
const subcategories = computed(() => subcategoriesOf(props.section))
const otherSections = computed(() => sections.filter((s) => s.key !== props.section))

// 現在表示中の文書をハイライト（route.path / href を末尾スラッシュと .html を除去して比較）
function isActive(href: string): boolean {
  if (!href || href === '#') return false
  const norm = (s: string) => s.replace(/\/$/, '').replace(/\.html$/, '')
  return norm(route.path) === norm(href)
}

// ツリー折たたみ（セクション別 localStorage。デフォルト = 全展開）
const treeKey = computed(() => `sv-tree-${props.section}`)
const collapsedCats = ref<Record<string, boolean>>({})
function isExpanded(name: string): boolean {
  return collapsedCats.value[name] !== true
}
function toggleCat(name: string) {
  collapsedCats.value = { ...collapsedCats.value, [name]: isExpanded(name) }
  try {
    const collapsed = Object.keys(collapsedCats.value).filter((k) => collapsedCats.value[k])
    localStorage.setItem(treeKey.value, JSON.stringify(collapsed))
  } catch { /* ignore */ }
}

// 全体折たたみ（« / Ctrl+B / localStorage）
const sidebarCollapsed = ref(false)
const STORAGE_KEY = 'sv-sidebar'
function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
  try { localStorage.setItem(STORAGE_KEY, sidebarCollapsed.value ? '1' : '0') } catch { /* ignore */ }
}
function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
    e.preventDefault()
    toggleSidebar()
  }
}
onMounted(() => {
  try { sidebarCollapsed.value = localStorage.getItem(STORAGE_KEY) === '1' } catch { /* ignore */ }
  try {
    const collapsed = JSON.parse(localStorage.getItem(treeKey.value) || '[]') as string[]
    collapsedCats.value = Object.fromEntries(collapsed.map((k) => [k, true]))
  } catch { /* ignore */ }
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <!-- 折たたみ時の復元ボタン（lg 以上のみ） -->
  <button
    v-if="sidebarCollapsed"
    type="button"
    @click="toggleSidebar"
    class="fixed left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:grid place-items-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300"
    title="サイドバーを表示 (Ctrl+B)"
    aria-label="サイドバーを表示"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>
  </button>

  <aside
    v-if="!sidebarCollapsed && meta"
    class="hidden lg:block w-56 shrink-0 py-8 border-r border-slate-100 dark:border-slate-800"
  >
    <div class="flex items-center justify-between px-3 mb-3">
      <p class="text-[11px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">{{ meta.label }}</p>
      <button
        type="button"
        @click="toggleSidebar"
        class="grid place-items-center w-6 h-6 -mr-1 rounded-md text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300"
        title="サイドバーを隠す (Ctrl+B)"
        aria-label="サイドバーを隠す"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>
      </button>
    </div>

    <nav class="text-sm flex flex-col">
      <div v-for="cat in subcategories" :key="cat.name" class="mb-1">
        <button
          type="button"
          @click="toggleCat(cat.name)"
          class="w-full flex items-center gap-1.5 px-3 py-1.5 rounded-md text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50"
        >
          <svg
            class="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0 transition-transform"
            :class="isExpanded(cat.name) ? '' : '-rotate-90'"
            fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 20 20"
          ><path d="M5.5 7.5 10 12l4.5-4.5"/></svg>
          <span class="truncate">{{ cat.name }}</span>
          <span class="ml-auto text-[11px] text-slate-400 dark:text-slate-500">{{ cat.docs.length }}</span>
        </button>
        <div v-show="isExpanded(cat.name)" class="ml-2 border-l border-slate-100 dark:border-slate-800 pl-2 mt-0.5">
          <a
            v-for="d in cat.docs"
            :key="d.title"
            :href="d.href"
            :class="isActive(d.href)
              ? 'block px-3 py-1.5 rounded-md bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 font-medium truncate'
              : 'block px-3 py-1.5 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 truncate'"
          >{{ d.title }}</a>
        </div>
      </div>
    </nav>

    <div class="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
      <p class="px-3 text-[11px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-2">他のセクション</p>
      <nav class="text-sm flex flex-col">
        <a
          v-for="s in otherSections"
          :key="s.key"
          :href="s.navHref"
          class="flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
        >{{ s.label }} <span class="text-slate-400 dark:text-slate-500">↗</span></a>
      </nav>
    </div>
  </aside>
</template>
