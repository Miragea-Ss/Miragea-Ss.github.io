# GitHub Pages + PinMe デプロイ手順

## 📋 前提条件

1. GitHubアカウント: `Miragea-Ss`
2. リポジトリ名: **`Miragea-Ss.github.io`** （重要：この名前でないとルートドメインにならない）
3. Node.js 20以上がインストールされていること

---

## 🚀 ステップ1: GitHubリポジトリの準備

### 1-1. リポジトリ名の確認

**重要**: `https://Miragea-Ss.github.io` で公開するには、リポジトリ名を **`Miragea-Ss.github.io`** にする必要があります。

- ✅ 正しい: `Miragea-Ss.github.io`
- ❌ 間違い: `miragea-space`, `miragea-project` など

### 1-2. 既存リポジトリの処理

**前のリポジトリがある場合：**

1. **オプションA: 既存リポジトリを削除して新規作成**
   - GitHubで既存リポジトリを削除
   - 新しいリポジトリ `Miragea-Ss.github.io` を作成

2. **オプションB: 既存リポジトリをリネーム**
   - GitHubのリポジトリ設定で名前を変更
   - `Miragea-Ss.github.io` に変更

**推奨**: オプションA（削除して新規作成）が最も確実です。

---

## 🚀 ステップ2: ローカルプロジェクトの準備

### 2-1. Gitの初期化（まだの場合）

```bash
cd miragea-space
git init
git branch -M main
```

### 2-2. 不要なファイルの確認

`.gitignore` に以下が含まれていることを確認：
- `node_modules/`
- `dist/`
- `.astro/`

これらは自動的に除外されます。

### 2-3. 初回コミット

```bash
git add .
git commit -m "Initial commit: Miragea Archive"
```

---

## 🚀 ステップ3: GitHubリポジトリに接続

### 3-1. リモートリポジトリの追加

```bash
git remote add origin https://github.com/Miragea-Ss/Miragea-Ss.github.io.git
```

### 3-2. コードのプッシュ

```bash
git push -u origin main
```

---

## 🚀 ステップ4: GitHub Pagesの設定

### 4-1. GitHubリポジトリの設定を開く

1. GitHubで `Miragea-Ss.github.io` リポジトリを開く
2. **Settings** → **Pages** をクリック

### 4-2. ソースの設定

- **Source**: `GitHub Actions` を選択
- **Branch**: `main` を選択（デフォルト）

### 4-3. 保存

設定を保存すると、GitHub Actionsが自動的に実行されます。

---

## 🚀 ステップ5: 自動デプロイの確認

### 5-1. Actionsタブで確認

1. GitHubリポジトリの **Actions** タブを開く
2. `Deploy to GitHub Pages` ワークフローが実行されていることを確認
3. 緑色のチェックマークが表示されるまで待つ（約2-3分）

### 5-2. サイトの確認

数分後、以下のURLでサイトにアクセスできます：

**https://Miragea-Ss.github.io**

---

## 🔄 今後の更新フロー

### 自動デプロイ（GitHub Pages）

1. ローカルで変更を加える
2. コミット & プッシュ：
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
3. GitHub Actionsが自動的にビルド & デプロイ
4. 数分後、サイトが更新される

---

## 🌐 手動IPFSバックアップ（PinMe）

### 重要なバージョンをIPFSに保存

1. **ビルドを実行**
   ```bash
   cd miragea-space
   npm run build
   ```

2. **PinMeでIPFSにアップロード**
   ```bash
   pinme add ./dist
   ```

3. **IPFS Hashを保存**
   - 表示されたHash（例: `QmXXXXX...`）を記録
   - このHashは永続的なバックアップとして機能

4. **IPFSで確認**
   - `https://ipfs.io/ipfs/QmXXXXX...` でアクセス可能

---

## ⚠️ トラブルシューティング

### 問題1: デプロイが失敗する

**原因**: ファイルが重すぎる、または依存関係の問題

**解決策**:
1. `.gitignore` を確認し、`node_modules/` が除外されているか確認
2. `package-lock.json` はコミットする（依存関係の固定）
3. 大きな画像ファイルは `public/images/` に配置（Git LFSは不要）

### 問題2: サイトが表示されない

**原因**: GitHub Pagesの設定が正しくない

**解決策**:
1. Settings → Pages で `GitHub Actions` が選択されているか確認
2. Actionsタブでエラーがないか確認
3. リポジトリ名が `Miragea-Ss.github.io` であることを確認

### 問題3: 404エラー

**原因**: ビルドパスが正しくない

**解決策**:
1. `astro.config.mjs` の `site` と `base` を確認
2. 正しく設定されているか確認：
   ```js
   site: 'https://Miragea-Ss.github.io',
   base: '/'
   ```

---

## 📝 チェックリスト

デプロイ前の確認：

- [ ] リポジトリ名が `Miragea-Ss.github.io` である
- [ ] `.gitignore` に `node_modules/` と `dist/` が含まれている
- [ ] `astro.config.mjs` の `site` が正しく設定されている
- [ ] GitHub Pagesの設定で `GitHub Actions` が選択されている
- [ ] 初回プッシュが完了している

---

## 🎯 完了後の確認

デプロイが成功したら：

1. **https://Miragea-Ss.github.io** にアクセス
2. 各言語ページが正しく表示されるか確認：
   - `/ja/` - 日本語
   - `/en/` - 英語
   - `/zh/` - 中国語
3. 記事が正しく表示されるか確認

---

**これで、GitHub Pagesでの自動デプロイとPinMeでの手動IPFSバックアップの両方が設定されました。**
