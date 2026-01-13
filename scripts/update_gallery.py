---
// src/components/InfiniteGallery.astro
import defaultWorks from '../data/works.json';

const { 
  lang = 'en', 
  works = defaultWorks 
} = Astro.props;

// === ここが修正点：本物のデータだけを使います ===
const displayWorks = works;

const uiText = {
  en: { empty: "Void...", loading: "Loading memories..." },
  ja: { empty: "虚空...", loading: "記憶を読み込み中..." },
  zh: { empty: "虚空...", loading: "正在读取记忆..." }
};
const t = uiText[lang] || uiText.en;
---

<!-- ギャラリーコンテナ -->
{displayWorks.length > 0 ? (
  <div class="gallery-wrapper">
    
    <!-- 1. 画像リスト（最初はCSSで隠しておく） -->
    <div id="masonry-grid" class="masonry-grid">
      {displayWorks.map((work) => (
        <div class="work-item hidden-item"> 
          <a href={work.file} target="_blank" class="work-link group">
            <div class="image-container">
              <img 
                src={work.file} 
                alt={work.title} 
                loading="lazy"
                decoding="async"
              />
              <div class="overlay">
                <span class="view-text">View</span>
              </div>
            </div>
            <div class="meta-info">
              <h3 class="work-title">{work.title}</h3>
              <div class="work-tags">
                {work.tags.slice(0, 3).map(tag => <span>#{tag}</span>)}
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>

    <!-- 2. 下までスクロールした時のローディング表示 -->
    <div id="loading-trigger" class="loading-state">
      <div class="spinner"></div>
      <p>{t.loading}</p>
    </div>

  </div>
) : (
  <div class="empty-state">{t.empty}</div>
)}

<!-- ▼ 無限スクロール制御スクリプト（本物版） ▼ -->
<script>
  document.addEventListener('astro:page-load', initInfiniteScroll);
  document.addEventListener('DOMContentLoaded', initInfiniteScroll);

  function initInfiniteScroll() {
    const grid = document.getElementById('masonry-grid');
    if (!grid) return;

    const allItems = Array.from(grid.querySelectorAll('.hidden-item'));
    const trigger = document.getElementById('loading-trigger');
    
    // 一度に表示する枚数（12枚ずつ）
    const BATCH_SIZE = 12;
    let currentIndex = 0;

    const loadMore = () => {
      // 残りの画像から次のバッチを取得
      const nextBatch = allItems.slice(currentIndex, currentIndex + BATCH_SIZE);
      
      // 画像がもうなければ終了
      if (nextBatch.length === 0) {
        if(trigger) trigger.style.display = 'none';
        return;
      }

      // 画像を1枚ずつフワッと表示させる
      nextBatch.forEach((item, i) => {
        setTimeout(() => {
          item.classList.remove('hidden-item');
          item.classList.add('reveal-item');
        }, i * 100); 
      });

      currentIndex += BATCH_SIZE;
    };

    // 初期表示
    loadMore();

    // スクロール監視
    if (trigger) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // 下に来たら次のバッチを読み込む
          setTimeout(loadMore, 300);
        }
      }, { rootMargin: '200px' });
      
      observer.observe(trigger);
    }
  }
</script>

<style>
  /* === Masonry Grid === */
  .masonry-grid {
    column-count: 1;
    column-gap: 2rem;
    max-width: 1800px;
    margin: 0 auto;
  }
  @media (min-width: 768px) { .masonry-grid { column-count: 2; } }
  @media (min-width: 1200px) { .masonry-grid { column-count: 3; } }
  @media (min-width: 1600px) { .masonry-grid { column-count: 4; } }

  .work-item {
    break-inside: avoid;
    margin-bottom: 3rem;
  }

  /* === アニメーション === */
  .hidden-item { display: none; }
  
  .reveal-item {
    display: block;
    animation: slideUpFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  @keyframes slideUpFade {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* === カードスタイル === */
  .image-container {
    border-radius: 1.5rem;
    overflow: hidden;
    background: #111;
    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
    transition: transform 0.5s;
    position: relative;
  }
  .work-link:hover .image-container {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px -10px rgba(255,255,255,0.05);
  }
  img {
    width: 100%; height: auto; display: block; opacity: 0.8; transition: opacity 0.5s;
  }
  .work-link:hover img { opacity: 1; }

  .meta-info { padding: 1rem 0.5rem; opacity: 0.6; }
  .work-title { font-size: 0.95rem; font-weight: 300; color: #eee; margin-bottom: 0.5rem; }
  .work-tags span { font-size: 0.75rem; color: #666; margin-right: 0.5rem; }

  .overlay {
    position: absolute; inset: 0; background: rgba(255,255,255,0.05);
    opacity: 0; transition: opacity 0.3s;
    display: flex; align-items: center; justify-content: center;
  }
  .work-link:hover .overlay { opacity: 1; }
  .view-text { color: #fff; letter-spacing: 0.2em; font-size: 0.8rem; text-transform: uppercase; }

  .loading-state {
    text-align: center; padding: 4rem; color: #666;
    display: flex; flex-direction: column; align-items: center; gap: 1rem;
    font-family: monospace; font-size: 0.8rem;
  }
  .spinner {
    width: 30px; height: 30px; border: 2px solid #333; border-top-color: #888;
    border-radius: 50%; animation: spin 1s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .empty-state { text-align: center; padding: 5rem; color: #333; font-style: italic; }
</style>