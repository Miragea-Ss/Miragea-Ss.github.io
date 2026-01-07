// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Content Collections統合
  integrations: [],
  
  // View Transitions有効化（Miragea美学：breathing motion）
  vite: {
    plugins: [tailwindcss()]
  },
  
  // ビルド最適化
  build: {
    assets: 'assets'
  },
  
  // GitHub Pages用の設定
  site: 'https://Miragea-Ss.github.io',
  
  // ベースパス（ルートドメインなので '/'）
  base: '/'
});