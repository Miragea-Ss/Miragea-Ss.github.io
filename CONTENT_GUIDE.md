# Mirageaアーカイブ - コンテンツ追加ガイド

## 📋 概要

このガイドでは、Mirageaアーカイブに作品（画像、音楽、記事、動画など）を効率的に追加する方法を説明します。

---

## 🗂️ ファイル構造

```
miragea-space/
├── public/
│   ├── images/          # 画像ファイル（.jpg, .png, .svg, .webp）
│   ├── videos/          # 動画ファイル（.mp4, .webm）
│   └── music/           # 音楽ファイル（.mp3, .wav, .ogg）
├── src/
│   └── content/
│       └── thoughts/    # 記事（Markdownファイル）
```

---

## 🎨 画像を追加する方法

### ステップ1: 画像ファイルを配置

```bash
# 画像を public/images/ にコピー
# 例: public/images/my-artwork.jpg
```

### ステップ2: 記事に画像を追加

新しい記事を作成するか、既存の記事を編集：

```markdown
---
title: "作品タイトル"
atmosphere: "作品の雰囲気"
cover: "/images/my-artwork.jpg"  # カバー画像
intuitionDate: 2026-01-07
confidence: 85
mood: "Serene"
language: "jp"
topics: ["Art", "Visual"]
---

## 作品の説明

![作品名](/images/my-artwork.jpg)

本文をここに書きます...
```

### 画像の表示方法

**カバー画像（記事のトップに表示）:**
```markdown
cover: "/images/my-artwork.jpg"
```

**本文内の画像:**
```markdown
![画像の説明](/images/my-artwork.jpg)
```

**複数の画像:**
```markdown
![作品1](/images/artwork-1.jpg)

![作品2](/images/artwork-2.jpg)
```

---

## 🎵 音楽を追加する方法

### ステップ1: 音楽フォルダの作成（まだの場合）

```bash
mkdir public/music
```

### ステップ2: 音楽ファイルを配置

```bash
# 音楽を public/music/ にコピー
# 例: public/music/my-composition.mp3
```

### ステップ3: 記事に音楽プレイヤーを追加

```markdown
---
title: "音楽作品のタイトル"
atmosphere: "音楽の雰囲気"
intuitionDate: 2026-01-07
confidence: 90
mood: "Resonant"
language: "jp"
topics: ["Music", "Composition"]
---

## 音楽作品

<audio controls src="/music/my-composition.mp3" class="w-full mt-4"></audio>

作品の説明をここに書きます...
```

### 音楽プレイヤーのカスタマイズ

```html
<!-- シンプルなプレイヤー -->
<audio controls src="/music/my-composition.mp3"></audio>

<!-- スタイル付きプレイヤー -->
<audio controls src="/music/my-composition.mp3" class="w-full rounded-lg shadow-lg"></audio>
```

---

## 📝 記事を追加する方法

### ステップ1: 新しいMarkdownファイルを作成

```bash
# src/content/thoughts/ に新しいファイルを作成
# 例: src/content/thoughts/my-new-article-jp.md
```

### ステップ2: Frontmatterを記述

```markdown
---
title: "記事のタイトル"
atmosphere: "記事の雰囲気"
cover: "/images/cover-image.jpg"  # オプション
intuitionDate: 2026-01-07
confidence: 85
mood: "Serene"
language: "jp"  # "jp", "en", "cn" のいずれか
topics: ["Art", "Music", "Workflow", "System", "Emotion"]
---
```

### ステップ3: 本文を記述

```markdown
---
title: "記事のタイトル"
...
---

## セクション1

本文をここに書きます。

### サブセクション

詳細な説明...

## セクション2

画像や音楽も含めることができます：

![画像](/images/my-image.jpg)

<audio controls src="/music/my-music.mp3"></audio>
```

---

## 🎬 動画を追加する方法

### ステップ1: 動画ファイルを配置

```bash
# 動画を public/videos/ にコピー
# 例: public/videos/my-video.mp4
```

### ステップ2: 記事に動画プレイヤーを追加

```markdown
---
title: "動画作品のタイトル"
...
---

## 動画作品

<video controls loop playsinline class="w-full rounded-xl shadow-2xl mt-8">
  <source src="/videos/my-video.mp4" type="video/mp4" />
  お使いのブラウザは動画タグに対応していません。
</video>
```

---

## 🚀 効率的なワークフロー

### 方法1: 手動で追加（推奨：完全な制御）

1. **ファイルを配置**
   ```bash
   # 画像: public/images/
   # 音楽: public/music/
   # 動画: public/videos/
   ```

2. **記事を作成**
   ```bash
   # src/content/thoughts/ に新しい .md ファイルを作成
   ```

3. **Frontmatterを記述**
   - タイトル、雰囲気、日付、確信度、言語、トピックを設定

4. **本文を記述**
   - Markdown形式で本文を書く
   - 画像、音楽、動画を埋め込む

5. **ローカルで確認**
   ```bash
   npm run dev
   # http://localhost:4321 で確認
   ```

6. **GitHubにプッシュ**
   ```bash
   git add .
   git commit -m "Add new artwork: [タイトル]"
   git push
   ```

### 方法2: Decap CMSを使用（将来実装予定）

1. `http://localhost:4321/admin` にアクセス
2. ウェブインターフェースで記事を作成
3. 画像をアップロード
4. 自動的にGitHubにコミット

---

## 📋 コンテンツ追加のチェックリスト

### 画像を追加する場合

- [ ] 画像ファイルを `public/images/` に配置
- [ ] 記事のFrontmatterに `cover` を追加（カバー画像の場合）
- [ ] 本文に画像を埋め込む（`![説明](/images/filename.jpg)`）
- [ ] ファイル名にスペースがないことを確認（`-` や `_` を使用）

### 音楽を追加する場合

- [ ] 音楽フォルダを作成（`mkdir public/music`）
- [ ] 音楽ファイルを `public/music/` に配置
- [ ] 記事に `<audio>` タグを追加
- [ ] ファイルサイズを確認（200MB以下推奨）

### 動画を追加する場合

- [ ] 動画ファイルを `public/videos/` に配置
- [ ] 記事に `<video>` タグを追加
- [ ] ファイルサイズを確認（大きい場合は圧縮を検討）

### 記事を追加する場合

- [ ] `src/content/thoughts/` に新しい `.md` ファイルを作成
- [ ] Frontmatterを正しく記述（必須フィールドを確認）
- [ ] `language` フィールドを設定（`jp`, `en`, `cn`）
- [ ] 適切な `topics` を設定
- [ ] ローカルで確認してからプッシュ

---

## 🎯 トピック（Topics）の推奨値

記事の `topics` フィールドには、以下のような値を設定できます：

- **Art** - 視覚的な作品
- **Music** - 音楽作品
- **Workflow** - 制作プロセス
- **System** - 技術的な記録
- **Emotion** - 感情の記録
- **HSP** - 高感度な知覚
- **Sensory** - 感覚的な記録
- **Perception** - 知覚の記録
- **Memory** - 記憶の記録
- **Color** - 色彩に関する記録

---

## 📝 記事のテンプレート

### 画像作品用テンプレート

```markdown
---
title: "作品タイトル"
atmosphere: "作品の雰囲気"
cover: "/images/artwork.jpg"
intuitionDate: 2026-01-07
confidence: 85
mood: "Serene"
language: "jp"
topics: ["Art", "Visual"]
---

## 作品について

![作品名](/images/artwork.jpg)

この作品についての説明を書きます...

## 制作プロセス

制作の過程や技術的な詳細を書きます...
```

### 音楽作品用テンプレート

```markdown
---
title: "音楽作品のタイトル"
atmosphere: "音楽の雰囲気"
intuitionDate: 2026-01-07
confidence: 90
mood: "Resonant"
language: "jp"
topics: ["Music", "Composition"]
---

## 音楽作品

<audio controls src="/music/composition.mp3" class="w-full mt-4"></audio>

## 作品について

この音楽作品についての説明を書きます...

## 制作の背景

制作の背景やインスピレーションを書きます...
```

### 制作プロセス用テンプレート

```markdown
---
title: "制作プロセスのタイトル"
atmosphere: "プロセスの雰囲気"
intuitionDate: 2026-01-07
confidence: 75
mood: "Contemplative"
language: "jp"
topics: ["Workflow", "Process"]
---

## 制作プロセス

制作の過程を記録します...

## 使用したツール

- ツール1
- ツール2

## 学んだこと

このプロセスから学んだことを書きます...
```

---

## ⚠️ 注意事項

### ファイルサイズ

- **画像**: 1MB以下推奨（WebP形式を推奨）
- **音楽**: 10MB以下推奨（MP3形式を推奨）
- **動画**: 50MB以下推奨（MP4形式を推奨）

### ファイル名

- スペースは避ける（`-` や `_` を使用）
- 日本語ファイル名は避ける（英数字と `-`, `_` を使用）
- 例: `my-artwork.jpg` ✅ / `私の作品.jpg` ❌

### 言語の設定

- `language: "jp"` - 日本語記事
- `language: "en"` - 英語記事
- `language: "cn"` - 中国語記事

各言語ページで正しく表示されるように、必ず設定してください。

---

## 🎉 完了後の確認

1. **ローカルで確認**
   ```bash
   npm run dev
   # http://localhost:4321 で確認
   ```

2. **GitHubにプッシュ**
   ```bash
   git add .
   git commit -m "Add new content: [タイトル]"
   git push
   ```

3. **自動デプロイの確認**
   - GitHub Actionsが自動的にビルド & デプロイ
   - 数分後、https://Miragea-Ss.github.io で確認

4. **IPFSバックアップ（重要な場合のみ）**
   ```bash
   npm run build
   pinme upload ./dist --domain miragea6
   ```

---

**これで、Mirageaアーカイブに作品を効率的に追加できます！**
