# Campaign Watcher → 参加 → 賞金 プレイブック

## できること（自動化済み）

| 段階 | 自動 | 内容 |
|------|------|------|
| 監視 | ✅ | Devpost 公開 API から open/upcoming を毎日取得 |
| 採点 | ✅ | 賞金規模 + AI/創作フィット + オンライン可否 |
| 一覧 | ✅ | `agents/contests.yaml` + サイト `status.json` |
| 推奨 | ✅ | `agents/campaign-action-queue.json` に JOIN 候補 |
| 登録・提出 | ❌ 半自動 | 第三者サイトのアカウント・規約・賞金 KYC が必要 |
| 賞金受取 | ❌ 手動 | 実名/税情報は本人のみ（Eliora は仲介しない） |

## 参加の判断（joinScore）

- **≥ 45** … 参加推奨（queue に入る）
- **賞金 ≥ $1000** かつ AI/創作テーマ … 最優先
- invite-only / フィット低 … 除外

## 人間がやること（賞金まで）

1. queue の Top を開く（`submitUrl`）
2. 参加資格（国・年齢・チーム）を確認
3. Devpost 等に **自分のアカウント** で登録
4. Eliora / Infinite Canvas / GeekSpell で作品を作る
5. 提出 → 結果待ち → 賞金は主催者の指示どおり本人が受取

## コマンド

```bash
cd F:\Astro\miragea-space
npm run agents:sync    # watch + export + validate
```

GitHub Actions: 毎日 06:00 UTC 自動実行。
