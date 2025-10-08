# 売上管理システム (new-system-id68)

## ⚠️ 重要: 日程システムとは別プロジェクト
このプロジェクトは「日程システム」とは**完全に別のシステム**です。
- 別のGitHubリポジトリ
- 別のVercelプロジェクト
- 別のSupabaseアカウント・プロジェクト

---

## プロジェクト概要
売上・入出金管理システム
複数端末でリアルタイム同期可能

---

## 重要な接続情報

### GitHub リポジトリ
- **URL**: https://github.com/airlink0917/NEW-.git
- **ブランチ**: main

### Vercel デプロイメント
- **プロジェクト名**: new-id68
- **本番URL**: https://new-id68.vercel.app
- **エントリーポイント**: dashboard.html
- **自動デプロイ**: main ブランチへのpush時に自動デプロイ

### Supabase 設定
- **プロジェクト名**: new-system-id68
- **Project URL**: https://qddyqqmpqqkkbibplsmn.supabase.co
- **リージョン**: Tokyo (ap-northeast-1)
- **Anon Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZHlxcW1wcXFra2JpYnBsc21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NTc5MTgsImV4cCI6MjA3MzIzMzkxOH0.KAgZ8D5cRgdPS-AoIeG7bwFiNzbGV8TW22rhGLft6sY
- **User ID**: shared_user_2024 (全端末共通)

#### データベーステーブル
1. **sales_data** - 売上・入出金データ（calendar, weekly, deposit, withdraw）

---

## 主要ファイル構成

```
売上カレンダー/
├── dashboard.html      # メインHTML（エントリーポイント）
├── supabase-sync.js    # Supabase同期ロジック
├── vercel.json         # Vercel設定
├── .gitignore          # Git除外設定
├── PROJECT_INFO.md     # このファイル
├── README.md           # プロジェクト説明
├── docs/               # ドキュメント類
│   ├── BACKUP_GUIDE.md
│   ├── mobile_recovery_guide.txt
│   └── sync_test_report.md
└── tools/              # 開発・テストツール
    ├── backup_manager.html
    ├── check_supabase.html
    ├── sync_check.html
    └── その他ツール
```

---

## 主要機能

### 1. 売上管理
- カレンダー形式での売上入力
- 週次集計
- 年間サマリー
- 手動保存ボタン（即座に同期）

### 2. 入出金管理
- 入金記録
- 出金記録
- 残高計算

### 3. データ同期
- **同期間隔**: 5秒
- **同期方式**: タイムスタンプ比較
- **手動保存**: ボタンクリックで即座に全端末に反映

---

## 同期設定

### 自動同期
- 5秒ごとにSupabaseから最新データを取得
- タイムスタンプ比較で変更を検知
- 変更があれば画面を自動更新

### 手動保存
- 「手動保存」ボタンで即座にSupabaseに保存
- 他の端末が5秒以内に受信
- データ入力後すぐに反映させたい時に使用

---

## 次回作業時の手順

### 1. プロジェクトを開く
```bash
cd "C:\Users\user\OneDrive\デスクトップ\売上カレンダー"
```

### 2. 最新コードを取得
```bash
git pull
```

### 3. 変更を確認
```bash
git status
```

### 4. 開発・確認
- ローカル: `dashboard.html` をブラウザで開く
- 本番: https://new-id68.vercel.app

### 5. 変更をコミット・デプロイ
```bash
git add .
git commit -m "変更内容の説明"
git push
```
→ Vercelが自動デプロイ

---

## トラブルシューティング

### Supabase接続エラー
1. ブラウザのコンソールでエラー確認
2. supabase-sync.js の SUPABASE_URL と SUPABASE_ANON_KEY を確認
3. Supabaseプロジェクトが稼働中か確認

### 同期が遅い場合
- 「手動保存」ボタンを使用（即座に反映）
- supabase-sync.js の同期間隔（現在5秒）を確認

### データが消えた場合
1. ブラウザのローカルストレージ確認
2. Supabase ダッシュボードでデータ確認
3. tools/backup_manager.html でバックアップ確認

### Vercelデプロイエラー
1. vercel.json の設定確認（dashboard.html指定）
2. GitHubとVercelの連携確認
3. Vercelダッシュボードでログ確認

---

## 重要な注意事項

### 日程システムとの違い
| 項目 | 売上カレンダー | 日程システム |
|------|---------------|-------------|
| GitHub | airlink0917/NEW- | airlink0917/airlink- |
| Vercel | new-id68 | airlink-schedule |
| Supabase | qddyqqmpqqkkbibplsmn | vcbkuurfvwtwapqxrklc |
| メインファイル | dashboard.html | index.html |
| 同期間隔 | 5秒 | 10秒 |

### 容量制限
- Supabase無料プラン: 500MB
- 月間転送量: 5GB
- バックアップ推奨

### セキュリティ
- 現在は全ユーザーが同じデータにアクセス可能
- 認証機能は未実装

---

## 最近の更新

### 2025年10月8日
- 手動保存ボタン追加
- 同期速度改善
- プロジェクト整理・ドキュメント化

---

最終更新: 2025年10月8日
