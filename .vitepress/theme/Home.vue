<script setup lang="ts">
// ホーム画面（ランディング）。データは docs-data.ts に集約（実データ連携は後段で差し替え）
import { sections, docsBySection, recentDocs, statusMeta, sectionMeta } from './docs-data'
import SectionIcon from './SectionIcon.vue'

// 最近の更新: 全文書を新しい順に上位5件。表示用にバッジ情報を付与
const recent = recentDocs(5).map((d) => ({
  ...d,
  badgeText: sectionMeta(d.section)!.badgeText,
  badgeClass: sectionMeta(d.section)!.badgeClass,
}))
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 flex-1 w-full">
    <main class="py-10 min-w-0 flex-1">

      <!-- Hero -->
      <section class="mb-14">
        <div class="inline-flex items-center gap-2 text-xs font-medium text-brand-700 bg-brand-50 dark:text-brand-300 dark:bg-brand-500/10 rounded-full px-3 py-1 mb-4">
          <span class="status-dot bg-brand-500"></span> 社内設計書アーカイブ
        </div>
        <h1 class="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
          設計書を、ひとつの画面で。
        </h1>
        <p class="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          API・画面・ガイド、3つのセクションで設計書を整理。検索とナビゲーションで、目的の仕様に最短で辿り着く社内ポータルです。
        </p>
      </section>

      <!-- Sections（第1階層: API / 画面 / ガイド — DESIGN.md §3） -->
      <section class="mb-14">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">セクション</h2>
        <p class="text-sm text-slate-400 dark:text-slate-500 mb-5">カテゴリから設計書を探す</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            v-for="s in sections"
            :key="s.key"
            :href="s.navHref"
            class="group border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-sm transition"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="grid place-items-center w-10 h-10 rounded-lg" :class="s.iconClass">
                <SectionIcon :section="s.key" class="w-5 h-5" />
              </span>
              <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">{{ docsBySection(s.key).length }}件</span>
            </div>
            <h3 class="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-brand-300">{{ s.label }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ s.shortDescription }}</p>
          </a>
        </div>
      </section>

      <!-- Recent specs -->
      <section id="recent">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-5">最近の更新</h2>

        <div class="border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          <a
            v-for="r in recent"
            :key="r.title"
            :href="r.href"
            class="group flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
          >
            <span class="grid place-items-center w-9 h-9 rounded-lg text-xs font-semibold shrink-0" :class="r.badgeClass">
              {{ r.badgeText }}
            </span>
            <div class="min-w-0 flex-1">
              <p class="font-medium text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-brand-300 truncate">{{ r.title }}</p>
              <p class="text-sm text-slate-400 dark:text-slate-500 truncate">{{ r.description }}</p>
            </div>
            <div class="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-medium" :class="statusMeta[r.status].class">
                <span class="status-dot" :class="statusMeta[r.status].dot"></span>{{ r.status }}
              </span>
            </div>
            <div class="hidden md:block w-24 text-right text-xs text-slate-400 dark:text-slate-500">{{ r.updated }}</div>
          </a>
        </div>
      </section>

    </main>
  </div>
</template>
