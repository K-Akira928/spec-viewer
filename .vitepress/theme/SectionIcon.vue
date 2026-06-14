<script setup lang="ts">
// セクションアイコン。API=brackets / 画面=monitor / ガイド=book。
// size/color は親から class で指定（w-5 h-5 等）。stroke は currentColor
defineProps<{ section: 'api' | 'ui' | 'guide' }>()
</script>

<template>
  <!-- API: brackets -->
  <svg v-if="section === 'api'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path d="M8 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2M9 9l-3 3 3 3M15 9l3 3-3 3" />
  </svg>
  <!-- 画面: monitor（rect+path） -->
  <svg v-else-if="section === 'ui'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
  <!-- ガイド: book -->
  <svg v-else fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14ZM4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
  </svg>
</template>
