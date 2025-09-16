# 売上管理システム プロジェクト情報

## プロジェクト概要
売上管理システムのWebアプリケーション
- **メインファイル**: `dashboard.html`
- **デプロイ先**: Vercel (https://new-id68.vercel.app)
- **GitHubリポジトリ**: https://github.com/airlink0917/NEW-.git

## ファイル構成
```
C:\Users\user\OneDrive\デスクトップ\売上カレンダー\
├── dashboard.html          # メインのHTMLファイル（売上管理システム）
├── vercel.json            # Vercelデプロイメント設定
├── supabase-sync.js       # Supabaseとの同期スクリプト
├── README.md              # プロジェクトの説明
├── SUPABASE_SETUP.md      # Supabaseセットアップガイド
├── SUPABASE_簡単セットアップ.md  # Supabase簡単セットアップガイド
├── CHANGELOG.md           # 変更履歴
└── GitHub_アップロード手順.md    # GitHubへのアップロード手順

```

## 最近の変更履歴

### 2025年1月（最新）
1. **週表示の修正**
   - 10月第1週を9/29～10/4として表示するよう修正
   - 10月最終週を10/27～11/1として表示するよう修正
   - 月をまたぐ週の日付範囲表示を改善

2. **PCアクセス問題の修正**
   - ビューポート設定を簡略化（minimum-scale、maximum-scale、viewport-fitを削除）
   - htmlとbodyタグのoverflow-xとwidth制限を削除
   - dashboardクラスのoverflowをhiddenからautoに変更

3. **Vercelデプロイメント修正**
   - vercel.jsonのdestinationをindex.htmlからdashboard.htmlに変更
   - 404エラーを解決

## 技術仕様

### フロントエンド
- **HTML5/CSS3/JavaScript** (バニラJS)
- レスポンシブデザイン対応（PC/モバイル）
- ローカルストレージでのデータ保存

### バックエンド連携
- **Supabase** - データベースとリアルタイム同期
- supabase-sync.jsでデータ同期を管理

### デプロイメント
- **Vercel** - 自動デプロイ設定済み
- GitHubプッシュで自動的にデプロイ

## 主な機能

1. **売上カレンダー表示**
   - 月単位での売上データ表示
   - 週計機能（週ごとの集計）
   - 日本の祝日対応

2. **データ管理**
   - 売上データの入力・編集
   - 買上データの入力・編集
   - 利益計算
   - 経費管理
   - 入金管理
   - 来店者数/契約数の記録

3. **週計機能**
   - 週ごとの自動集計
   - 都道府県・店舗名の入力
   - 金曜/土曜終わりの選択可能
   - 営業利益の自動計算

4. **年間サマリー**
   - 月ごとの集計表示
   - 年間合計の表示

## 注意事項

### コーディング規約
- コメントは最小限に（必要な場合のみ）
- 既存のコードスタイルに従う
- モバイル対応を考慮した設計

### デバッグ・テスト
- PCとモバイル両方での動作確認必須
- ローカルストレージの動作確認
- Supabase同期の動作確認

### デプロイ時の確認事項
1. vercel.jsonの設定確認（dashboard.htmlを指定）
2. GitHubへのプッシュ後、Vercelでの自動デプロイ確認
3. 本番環境でのアクセス確認

## 開発環境
- Windows環境
- Git Bashまたはコマンドプロンプト使用
- VSCodeまたは任意のテキストエディタ

## 次回の作業開始時
このファイルを参照して、プロジェクトの現状を把握してから作業を開始してください。

```bash
# 作業ディレクトリ
cd C:\Users\user\OneDrive\デスクトップ\売上カレンダー

# Git状態確認
git status

# 最新の変更を取得
git pull origin main
```

## 連絡事項
- 週の開始/終了日の表示ロジックは月をまたぐ場合も考慮済み
- PCアクセス問題は解決済み
- Vercelデプロイメント設定は修正済み

---
最終更新: 2025年1月