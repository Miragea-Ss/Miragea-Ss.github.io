# PinMe IPFSバックアップ手順

## 📋 PinMeとは

[PinMe](https://github.com/glitternetwork/pinme) は、フロントエンドをIPFSネットワークにデプロイするツールです。GitHub Pagesと組み合わせることで、**「表（GitHub Pages）は自動化」しつつ、「裏（IPFS）は手動で永久保存」**する二刀流を実現できます。

---

## 🚀 ステップ1: PinMeのインストール

### グローバルインストール

```bash
npm install -g pinme
```

### インストール確認

```bash
pinme --version
```

---

## 🔑 ステップ2: PinMe AppKeyの取得

### 2-1. PinMeアカウントの作成

1. PinMeのウェブサイトにアクセス: https://pinme.eth.limo
2. アカウントを作成（必要に応じて）

### 2-2. AppKeyの取得

1. PinMeのダッシュボードにログイン
2. **AppKey** を取得（形式: `<address>-<jwt>`）
3. AppKeyを安全な場所に保存

### 2-3. AppKeyの設定

```bash
pinme set-appkey <your-app-key>
```

または、対話形式で設定：

```bash
pinme set-appkey
# プロンプトが表示されたら、AppKeyを貼り付け
```

### 2-4. AppKeyの確認

```bash
pinme show-appkey
```

---

## 📦 ステップ3: ビルドの実行

### 3-1. プロジェクトのビルド

```bash
cd miragea-space
npm run build
```

これで `dist/` フォルダに静的ファイルが生成されます。

---

## 🌐 ステップ4: IPFSへのアップロード

### 4-1. 基本的なアップロード

```bash
# distフォルダをIPFSにアップロード
pinme add ./dist
```

### 4-2. カスタムドメインを指定してアップロード

```bash
# カスタムドメイン名を指定（例: miragea-archive）
pinme add ./dist --domain miragea-archive
```

これで `https://miragea-archive.pinit.eth.limo` でアクセス可能になります。

### 4-3. アップロード結果

アップロードが成功すると、以下が表示されます：

```
✅ Upload successful!

IPFS Hash: QmXXXXX...
Access URL: https://miragea-archive.pinit.eth.limo
```

**重要**: IPFS Hashを記録しておいてください。これは永続的なバックアップとして機能します。

---

## 📋 ステップ5: アップロード履歴の確認

### 履歴の表示

```bash
pinme list
```

### 最後の5件を表示

```bash
pinme list -l 5
```

---

## 🔄 完全なワークフロー（GitHub Pages + PinMe）

### 日常的な更新フロー

#### 1. コンテンツの更新

```bash
# ローカルでコンテンツを編集
# src/content/thoughts/ に新しい記事を追加
# または既存の記事を編集
```

#### 2. GitHub Pagesへの自動デプロイ

```bash
# 変更をコミット
git add .
git commit -m "Add new thought: [タイトル]"
git push
```

**結果**: GitHub Actionsが自動的にビルド & デプロイ
- 数分後、https://Miragea-Ss.github.io で更新が反映される

#### 3. 重要なバージョンをIPFSに手動バックアップ

```bash
# ビルドを実行
npm run build

# IPFSにアップロード（重要なバージョンのみ）
pinme add ./dist --domain miragea-archive
```

**結果**: IPFS Hashが生成され、永続的なバックアップとして保存される

---

## 🎯 推奨される運用パターン

### パターンA: 頻繁な更新（GitHub Pagesのみ）

- 日常的なコンテンツ更新 → `git push` のみ
- GitHub Actionsが自動デプロイ
- IPFSバックアップは不要

### パターンB: 重要なマイルストーン（両方）

- 大きな機能追加やデザイン変更
- `git push` → GitHub Pagesに自動デプロイ
- `npm run build` → `pinme add ./dist` → IPFSに手動バックアップ

### パターンC: 完全バックアップ（定期的）

- 月1回、または重要な更新のたびに
- IPFSにバックアップを取る
- IPFS Hashを記録しておく

---

## 📝 便利なコマンド

### ドメインの確認

```bash
pinme my-domains
```

### ログアウト

```bash
pinme logout
```

### ヘルプ

```bash
pinme help
```

---

## ⚠️ 注意事項

### ファイルサイズ制限

- 単一ファイル: 200MB（無料プラン）
- ディレクトリ全体: 1GB（無料プラン）

### IPFS Hashの重要性

- IPFS Hashは永続的なバックアップとして機能
- Hashを記録しておくと、将来アクセス可能
- GitHubがダウンしても、IPFSネットワークからアクセス可能

### カスタムドメイン

- カスタムドメインは `.pinit.eth.limo` サブドメインとして提供
- 例: `miragea-archive` → `https://miragea-archive.pinit.eth.limo`

---

## 🔗 参考リンク

- PinMe公式リポジトリ: https://github.com/glitternetwork/pinme
- PinMe公式サイト: https://pinme.eth.limo
- IPFS公式サイト: https://ipfs.io

---

**これで、GitHub Pages（自動）とPinMe（手動）の二刀流デプロイが完成しました！**
