// セクション設定（メタ）。DESIGN.md §3 参照。
// docs-data.ts のデータ走査ロジックから分離し、セクション追加・編集をこの1ファイルで完結させる。
// クラス文字列は完全な形で持つ（Tailwind v4 スキャン対象）。
// セクションを増やすには配列にエントリを追加するだけ（docs-data の deriveSection が sections から動的に判定する）

export type SectionKey = 'api' | 'ui' | 'guide' | 'db'

export interface SectionMeta {
  key: SectionKey
  label: string
  description: string
  shortDescription: string
  navHref: string
  iconClass: string
  badgeClass: string
  badgeText: string
  accentText: string
}

export const sections: SectionMeta[] = [
  {
    key: 'api',
    label: 'API',
    description: 'エンドポイント・スキーマ・契約に関する設計書',
    shortDescription: 'エンドポイント・スキーマ・契約',
    navHref: '/api/',
    iconClass: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
    badgeClass: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
    badgeText: 'API',
    accentText: 'text-brand-600 dark:text-brand-400',
  },
  {
    key: 'ui',
    label: '画面',
    description: '画面設計・UI仕様・画面遷移に関する設計書',
    shortDescription: '画面設計・UI仕様・画面遷移',
    navHref: '/ui/',
    iconClass: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400',
    badgeClass: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400',
    badgeText: '画',
    accentText: 'text-sky-600 dark:text-sky-400',
  },
  {
    key: 'guide',
    label: 'ガイド',
    description: '執筆ガイドライン・テンプレート・規約',
    shortDescription: '執筆ガイドライン・テンプレート・規約',
    navHref: '/guide/',
    iconClass: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    badgeClass: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    badgeText: 'G',
    accentText: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    key: 'db',
    label: 'DB',
    description: 'スキーマ・テーブル・インデックス・移行に関する設計書',
    shortDescription: 'スキーマ・テーブル・インデックス',
    navHref: '/db/',
    iconClass: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
    badgeClass: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
    badgeText: 'DB',
    accentText: 'text-violet-600 dark:text-violet-400',
  },
]
