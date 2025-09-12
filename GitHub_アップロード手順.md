# GitHubへのアップロード手順（初心者向け）

## 📝 事前準備

### 1. GitHubアカウントの作成
1. https://github.com にアクセス
2. 右上の「Sign up」をクリック
3. メールアドレス、パスワード、ユーザー名を入力
4. メール認証を完了

---

## 方法1: ブラウザで直接アップロード（最も簡単）🌟

### ステップ1: 新しいリポジトリを作成
1. GitHubにログイン
2. 右上の「+」マークをクリック → 「New repository」を選択
3. 以下を入力：
   - Repository name: `sales-calendar`（好きな名前でOK）
   - Description: `売上カレンダー管理システム`（任意）
   - Public を選択（無料公開）またはPrivate（非公開）
4. 「Create repository」をクリック

### ステップ2: ファイルをアップロード
1. 「uploading an existing file」をクリック
2. エクスプローラーで `C:\Users\user\OneDrive\デスクトップ\売上カレンダー` を開く
3. 以下のファイルを選択してドラッグ&ドロップ：
   - dashboard.html
   - README.md
   - CHANGELOG.md
   - 作業内容.md
   - 使用方法.txt
   - その他必要なファイル
4. 下の「Commit changes」欄に「初回アップロード」と入力
5. 「Commit changes」ボタンをクリック

### ステップ3: 公開設定（GitHub Pages）
1. リポジトリページの「Settings」タブをクリック
2. 左メニューの「Pages」をクリック
3. Source で「Deploy from a branch」を選択
4. Branch で「main」を選択、フォルダは「/ (root)」
5. 「Save」をクリック
6. 数分待つと上部にURLが表示される
   例: `https://あなたのユーザー名.github.io/sales-calendar/dashboard.html`

---

## 方法2: GitHub Desktop を使う（継続的な更新に便利）

### ステップ1: GitHub Desktop をインストール
1. https://desktop.github.com/ からダウンロード
2. インストールして起動
3. GitHubアカウントでログイン

### ステップ2: リポジトリを作成
1. 「Create a New Repository on your hard drive」をクリック
2. 以下を入力：
   - Name: `sales-calendar`
   - Description: `売上カレンダー管理システム`
   - Local path: デスクトップなど
3. 「Create repository」をクリック

### ステップ3: ファイルをコピー
1. 作成されたフォルダを開く
2. `C:\Users\user\OneDrive\デスクトップ\売上カレンダー` の中身を全てコピー
3. リポジトリフォルダに貼り付け

### ステップ4: GitHubに公開
1. GitHub Desktop に戻る
2. 変更内容が表示される
3. 左下の Summary に「初回アップロード」と入力
4. 「Commit to main」をクリック
5. 上の「Publish repository」をクリック
6. 「Publish repository」ボタンをクリック

---

## 方法3: コマンドを使う（上級者向け）

### ステップ1: Gitをインストール
1. https://git-scm.com/download/win からダウンロード
2. インストール（全てデフォルトでOK）

### ステップ2: コマンドで操作
```bash
# 1. フォルダに移動
cd C:\Users\user\OneDrive\デスクトップ\売上カレンダー

# 2. Git初期化
git init

# 3. ファイルを追加
git add .

# 4. コミット
git commit -m "初回アップロード"

# 5. GitHubと接続
git remote add origin https://github.com/あなたのユーザー名/sales-calendar.git

# 6. アップロード
git push -u origin main
```

---

## 📱 アクセス方法

### GitHub Pages でWeb公開した場合
```
https://あなたのユーザー名.github.io/sales-calendar/dashboard.html
```

### ローカルで使う場合
1. リポジトリページの「Code」ボタンをクリック
2. 「Download ZIP」を選択
3. ZIPを解凍
4. dashboard.html をブラウザで開く

---

## 🔄 更新方法

### ブラウザで更新
1. リポジトリページでファイルをクリック
2. 鉛筆アイコン（Edit）をクリック
3. 編集して「Commit changes」

### GitHub Desktop で更新
1. ファイルを編集
2. GitHub Desktop で変更を確認
3. コミットメッセージを入力
4. 「Commit to main」→「Push origin」

---

## ⚠️ 注意事項

1. **パスワードについて**
   - dashboard.htmlにパスワードが含まれています
   - 公開リポジトリの場合、誰でも見られます
   - 必要に応じてパスワードを変更してください

2. **プライベート設定**
   - 無料アカウントでもPrivateリポジトリが作成可能
   - 他人に見られたくない場合はPrivateを選択

3. **ファイルサイズ**
   - 1ファイル100MB以下にする必要があります
   - 大きなExcelファイルは分割またはクラウドストレージ利用

---

## 🆘 トラブルシューティング

### アップロードできない
- ファイル名に日本語が含まれている → 英語に変更
- ファイルサイズが大きすぎる → 100MB以下に

### ページが表示されない
- GitHub Pages の設定を確認
- 5-10分待ってから再度アクセス
- URLの最後に `/dashboard.html` を付ける

### パスワードを変更したい
1. dashboard.html を編集
2. `CORRECT_PASSWORD = 'saku11'` の部分を変更
3. 変更をコミット

---

## 📞 サポート

不明な点があれば：
1. GitHubのヘルプ: https://docs.github.com/ja
2. GitHub Desktop ガイド: https://docs.github.com/ja/desktop

---

作成日: 2025年9月10日