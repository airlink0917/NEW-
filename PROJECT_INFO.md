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
1. **sales_data** - 売上・入出金データ（calendar, weekly, deposit, withdraw, deferredPayment）

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

### 3. 後日入金管理（NEW!）
- 月間売上合計から精算書額を引いた差額を自動計算
- 翌翌月月末の入金予定日を自動計算
- 入金確認日の記録
- **精算書額入力に電卓機能搭載**（計算式入力可能）
- **表示モード切り替え**
  - 月ごと表示：選択した月のみカード形式で表示
  - 1年間一覧表示：12ヶ月分をカード形式で縦1列表示
- **モバイル最適化UI**（大きめフォント、見やすいカードレイアウト）
- カードヘッダーに「〇年〇月 営業分」表示
- 各月のデータ：
  - 月間売上合計（売上管理ページから自動参照）
  - 精算書額（電卓で計算入力）
  - 差額（プラスは緑、マイナスは赤）
  - 後日入金予定日（自動計算：翌翌月月末）
  - 入金確認日（手動入力）
- LocalStorageとSupabase同期

### 4. データ同期
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

### 2025年10月8日（後日入金機能追加）
- ✅ **後日入金管理機能を実装**
  - ナビゲーションメニューに「後日入金」を追加
  - 精算書額入力に電卓機能実装（+、-、×の計算式入力可能）
  - 月間売上合計を売上管理ページから自動参照
  - 翌翌月月末の入金予定日を自動計算
  - 入金確認日の記録機能
  - 月ごと表示と1年間一覧表示の切り替え機能
  - モバイル最適化された縦1列カードレイアウト
  - カードヘッダーに「営業分」テキスト表示
  - LocalStorageとSupabase同期対応

### 2025年10月8日（初期作業）
- 手動保存ボタン追加
- 同期速度改善
- プロジェクト整理・ドキュメント化

---

## 後日入金機能の技術仕様

### データ構造
```javascript
deferredPaymentData = {
  "2025-01": {
    settlementAmount: 150000,      // 精算書額
    confirmationDate: "2025-03-15" // 入金確認日
  },
  "2025-02": {
    settlementAmount: 200000,
    confirmationDate: ""
  }
  // ... 各月のデータ
}
```

### 主要関数
- `getMonthlySalesTotal(year, month)`: 売上管理ページと同じロジックで月間売上合計を計算
- `getPaymentDueDate(year, month)`: 翌翌月の月末日を計算
- `updateDeferredYearlyTable(year)`: 1年間一覧をカード形式で表示
- `updateDeferredMonthlyCards(year)`: 月ごとをカード形式で表示
- `appendToCalc(value)`, `calculateCalc()`: 電卓機能
- `openDeferredPaymentModal(year, month)`: 編集モーダルを開く
- `saveDeferredPayment(event)`: データ保存とSupabase同期

### 電卓機能
- 数字ボタン（0-9、00）
- 演算子（+、-、×）
- Cボタン（クリア）
- =ボタン（計算実行）
- 計算式を入力して結果を取得可能

### 表示モード
1. **月ごと表示**:
   - 年と月を選択
   - 選択した月のみカード表示
   - モバイル最適化

2. **1年間一覧表示**:
   - 年を選択
   - 12ヶ月分のカードを縦1列に表示
   - スクロールで全月確認可能

---

最終更新: 2025年10月8日
