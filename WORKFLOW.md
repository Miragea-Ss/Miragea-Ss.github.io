# 完全なデプロイワークフロー（GitHub Pages + PinMe）

## 🎯 二刀流デプロイ戦略

**「表（GitHub Pages）は自動化」しつつ、「裏（IPFS）は手動で永久保存」**

- ✅ **GitHub Pages**: 日常的な更新は自動デプロイ
- ✅ **PinMe IPFS**: 重要なバージョンは手動で永久保存

---

## 📋 日常的な更新フロー

### ステップ1: コンテンツの編集

```bash
cd miragea-space

# 新しい記事を追加
# src/content/thoughts/ に新しいMarkdownファイルを作成

# または既存の記事を編集
# src/content/thoughts/sample-jp.md などを編集
```

### ステップ2: ローカルで確認（オプション）

```bash
# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:4321 を開いて確認
```

### ステップ3: GitHubにプッシュ（自動デプロイ）

```bash
# 変更をステージング
git add .

# コミット
git commit -m "Add new thought: [記事タイトル]"

# プッシュ（GitHub Actionsが自動的にビルド & デプロイ）
git push
```

### ステップ4: デプロイの確認

1. GitHubの **Actions** タブを開く
2. "Deploy to GitHub Pages" ワークフローが実行されていることを確認
3. 緑のチェックマークが表示されるまで待つ（約2-3分）

### ステップ5: サイトの確認

数分後、以下のURLで更新が反映されます：

**https://Miragea-Ss.github.io**

---

## 🌐 重要なバージョンのIPFSバックアップ

### いつIPFSにバックアップするか？

以下のような重要なマイルストーンでバックアップを推奨：

- ✅ 大きな機能追加
- ✅ デザインの大幅な変更
- ✅ 重要なコンテンツの追加
- ✅ 月1回の定期バックアップ

### ステップ1: ビルドの実行

```bash
cd miragea-space

# プロジェクトをビルド
npm run build
```

これで `dist/` フォルダに静的ファイルが生成されます。

### ステップ2: PinMeでIPFSにアップロード

```bash
# IPFSにアップロード（カスタムドメイン指定）
pinme add ./dist --domain miragea-archive
```

### ステップ3: IPFS Hashの記録

アップロードが成功すると、以下が表示されます：

```
✅ Upload successful!

IPFS Hash: QmXXXXX...
Access URL: https://miragea-archive.pinit.eth.limo
```

**重要**: IPFS Hashを記録しておいてください。これは永続的なバックアップとして機能します。

### ステップ4: アクセスの確認

以下のURLでIPFSバージョンにアクセスできます：

- **PinMeドメイン**: https://miragea-archive.pinit.eth.limo
- **IPFS Hash直接**: https://ipfs.io/ipfs/QmXXXXX...

---

## 🔄 完全なワークフロー例

### シナリオ: 新しい記事を追加する場合

#### 1. 記事の作成

```bash
# src/content/thoughts/new-article-jp.md を作成
# Frontmatterと本文を記述
```

#### 2. ローカルで確認

```bash
npm run dev
# http://localhost:4321/ja/ で確認
```

#### 3. GitHub Pagesに自動デプロイ

```bash
git add .
git commit -m "Add new article: [タイトル]"
git push
```

**結果**: 数分後、https://Miragea-Ss.github.io で公開

#### 4. IPFSバックアップ（重要な場合のみ）

```bash
npm run build
pinme add ./dist --domain miragea-archive
```

**結果**: IPFS Hashが生成され、永続的なバックアップとして保存

---

## 📊 デプロイ先の比較

| 項目 | GitHub Pages | PinMe IPFS |
|------|-------------|------------|
| **デプロイ方法** | 自動（git push） | 手動（pinme add） |
| **速度** | 数分 | 数秒 |
| **URL** | https://Miragea-Ss.github.io | https://miragea-archive.pinit.eth.limo |
| **永続性** | GitHub依存 | IPFSネットワーク（分散） |
| **用途** | 日常的な更新 | 重要なバージョンのバックアップ |
| **コスト** | 無料 | 無料（制限あり） |

---

## 🎯 推奨される運用パターン

### パターン1: 日常的な更新

```
編集 → git push → GitHub Pages自動デプロイ
```

**IPFSバックアップ**: 不要

### パターン2: 重要なマイルストーン

```
編集 → git push → GitHub Pages自動デプロイ
     ↓
npm run build → pinme add → IPFSバックアップ
```

**IPFSバックアップ**: 推奨

### パターン3: 定期バックアップ

```
月1回、または重要な更新のたびに
npm run build → pinme add → IPFSバックアップ
```

---

## 🔧 トラブルシューティング

### GitHub Pagesが更新されない

1. **Actionsタブを確認**
   - ワークフローが実行されているか確認
   - エラーがないか確認

2. **Settings → Pagesを確認**
   - Source: "GitHub Actions" が選択されているか確認

3. **キャッシュのクリア**
   - ブラウザのキャッシュをクリア
   - またはシークレットモードで確認

### PinMeのアップロードが失敗する

1. **AppKeyの確認**
   ```bash
   pinme show-appkey
   ```

2. **ファイルサイズの確認**
   - 単一ファイル: 200MB以下
   - ディレクトリ全体: 1GB以下

3. **ビルドの確認**
   ```bash
   npm run build
   # dist/ フォルダが生成されているか確認
   ```

---

## 📝 チェックリスト

### 日常的な更新

- [ ] コンテンツを編集
- [ ] ローカルで確認（オプション）
- [ ] `git add .` → `git commit` → `git push`
- [ ] Actionsタブでデプロイを確認
- [ ] サイトで更新を確認

### 重要なバージョンのバックアップ

- [ ] `npm run build` を実行
- [ ] `pinme add ./dist --domain miragea-archive` を実行
- [ ] IPFS Hashを記録
- [ ] IPFS URLでアクセスを確認

---

## 🎉 完了

これで、**「表（GitHub Pages）は自動化」しつつ、「裏（IPFS）は手動で永久保存」**する二刀流デプロイが完成しました！

- ✅ 日常的な更新: `git push` だけで自動デプロイ
- ✅ 重要なバージョン: `pinme add` でIPFSに永久保存

**Mirageaのアーカイブは、GitHub Pagesで公開され、IPFSで永久保存されます。**
