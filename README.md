# MIRAGEA

**Archive of Sensory Processing Sensitivity**

A dual-layer digital sanctuary for a Highly Sensitive Person (HSP):
- **Human Layer:** Aesthetic, immersive, dark-themed, emotional, art-gallery vibe
- **AI Layer:** Structured data (JSON-LD), semantic HTML, hidden beneath the visual layer

---

## 🏗️ Project Structure

```
miragea-space/
├── src/
│   ├── agent/              # Agent定義ファイル（Curator Agent）
│   ├── components/          # UIコンポーネント（ThoughtCard等）
│   ├── content/
│   │   ├── config.ts       # Content Collectionsスキーマ定義
│   │   └── thoughts/        # 思考・直感のMarkdownファイル
│   ├── layouts/            # レイアウトコンポーネント
│   ├── pages/              # ページルーティング
│   └── styles/             # グローバルスタイル
├── public/
│   ├── admin/              # Decap CMS設定
│   └── images/             # 静的画像アセット
└── astro.config.mjs        # Astro設定
```

---

## 🚀 Quick Start

### 開発サーバー起動

```bash
cd miragea-space
npm install
npm run dev
```

開発サーバーは `http://localhost:4321` で起動します。

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

---

## 📝 Content Collections

### Thoughts（思考・直感）

`src/content/thoughts/` にMarkdownファイルを配置します。

**必須フィールド：**
- `title`: タイトル（詩的な表現を推奨）
- `atmosphere`: 雰囲気の説明（例："Melancholic blue"）
- `intuitionDate`: 直感を感じた日時
- `confidence`: 確信度（0-100）
- `topics`: タグ配列

**オプションフィールド：**
- `cover`: カバー画像のパス

---

## 🎨 Design Philosophy

**Miragea美学の原則：**
- ❌ 対称的なグリッド、ブログ風レイアウト、標準的なボタン
- ✅ 非対称、不均等な配置、視覚的なポーズ、呼吸のような動き

**メタデータの視覚化：**
- Confidence（確信度）は光の強度として表現
- 日付やタグは控えめに配置
- データは「感じられる」ものであり、「読まれる」ものではない

---

## 🔧 Tech Stack

- **Framework:** Astro 5.16+
- **Styling:** Tailwind CSS 4.1+
- **Content:** Astro Content Collections
- **CMS:** Decap CMS (Netlify CMS)
- **Deployment:** GitHub Pages (Primary), PinMe → IPFS (Secondary)

---

## 📚 Next Steps

1. ✅ 基本セットアップ完了
2. 🔄 Decap CMS設定の完成
3. ⏳ 継続管理Agentの統合
4. ⏳ GitHub Actions自動デプロイ設定

---

**Miragea is not a blog. It is a living archive of sensory perception.**
