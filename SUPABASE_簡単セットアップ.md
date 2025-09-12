# 🎯 Supabase かんたんセットアップガイド

売上管理システムを**複数のスマホやPCで共有**できるようにする設定です。  
**完全無料**で使えます！

---

## 📱 こんな時に便利！

- スマホで入力 → PCで確認
- 店舗で入力 → 自宅で確認  
- チーム全員でデータ共有

---

## 🚀 セットアップ手順（約10分）

### ステップ1: Supabaseに登録（3分）

#### 1-1. サイトを開く
👉 [https://supabase.com](https://supabase.com) をクリック

#### 1-2. アカウント作成
1. 緑色の「**Start your project**」ボタンをクリック
2. 「**Sign Up**」をクリック  
3. メールアドレスとパスワードを入力
4. メールが届いたら、リンクをクリック

---

### ステップ2: プロジェクト作成（2分）

#### 2-1. 新規プロジェクト
1. 「**New Project**」をクリック
2. 以下を入力：

| 項目 | 入力内容 |
|------|----------|
| **Name** | sales（何でもOK） |
| **Password** | 好きなパスワード（メモする！） |
| **Region** | Northeast Asia (Tokyo) |

3. 「**Create new project**」をクリック
4. 2-3分待つ...☕

---

### ステップ3: データベース作成（2分）

#### 3-1. SQLエディタを開く
1. 左メニューの「**SQL Editor**」をクリック
2. 「**New query**」をクリック

#### 3-2. 以下を全部コピー

```sql
CREATE TABLE sales_data (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    data_type VARCHAR(20) NOT NULL,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, data_type)
);

CREATE INDEX idx_sales_data_user_id ON sales_data(user_id);
CREATE INDEX idx_sales_data_type ON sales_data(data_type);

ALTER TABLE sales_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for all users" ON sales_data
    FOR ALL USING (true) WITH CHECK (true);
```

#### 3-3. 実行
1. 貼り付けたら「**Run**」ボタンをクリック
2. 「Success」と出ればOK！

---

### ステップ4: APIキーをゲット（1分）

#### 4-1. 設定画面へ
1. 左メニューの「**Settings**」⚙️ をクリック
2. 「**API**」をクリック

#### 4-2. この2つをコピー

**① Project URL**（これをコピー）：
```
https://xxxxxxxxxxxxx.supabase.co
```

**② anon public**（これもコピー）：
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...
```

> 💡 メモ帳に貼り付けておくと便利！

---

### ステップ5: ファイルを編集（2分）

#### 5-1. GitHubを開く
1. [https://github.com/airlink0917/NEW-](https://github.com/airlink0917/NEW-) を開く
2. `supabase-sync.js` をクリック
3. 鉛筆アイコン ✏️ をクリック（編集）

#### 5-2. 2行目と3行目を変更

**変更前**：
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

**変更後**（さっきコピーしたものを貼る）：
```javascript
const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

#### 5-3. 保存
1. 下の「**Commit changes**」をクリック
2. 「**Commit changes**」をもう一度クリック

---

## ✅ 完了！

**数分待つと自動的に反映されます**

👉 [https://new-id68.vercel.app/dashboard.html](https://new-id68.vercel.app/dashboard.html) を開いて確認

---

## 💡 使い方のコツ

### 個人で使う場合
そのまま使えばOK！全デバイスで自動同期されます。

### チームで共有する場合

#### 方法1: 簡単な共有（おすすめ）
1. 最初に設定した人のPCで、開発者ツールを開く（F12キー）
2. コンソールに以下を入力：
```javascript
localStorage.getItem('userId')
```
3. 表示されたID（例：`user_1234567_abc`）をコピー
4. チームメンバーのPCで、同じくコンソールに：
```javascript
localStorage.setItem('userId', 'user_1234567_abc');
```
5. ページを更新（F5）

#### 方法2: 固定IDを使う
`supabase-sync.js`の7行目あたりを変更：

**変更前**：
```javascript
function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', userId);
    }
    return userId;
}
```

**変更後**：
```javascript
function getUserId() {
    return 'team_2024'; // チーム全員同じIDを使う
}
```

---

## ❓ よくある質問

### Q: 無料で使い続けられる？
**A**: はい！月間2GBまで無料です。通常使用なら十分です。

### Q: データは安全？
**A**: Supabaseは大手企業も使う安全なサービスです。

### Q: うまくいかない時は？
**A**: 以下を確認：
1. APIキーが正しくコピーされているか
2. 「'」や「"」が全角になっていないか
3. Vercelのデプロイが完了しているか（5分待つ）

### Q: スマホでも設定できる？
**A**: PCでの設定をおすすめしますが、スマホでも可能です。

---

## 🎉 設定お疲れさまでした！

これで**どこからでもアクセス**できる売上管理システムの完成です！

### 困ったときは
- エラーメッセージをコピーして検索
- ChatGPTに聞く
- GitHubのIssuesに質問

---

## 📊 動作確認チェックリスト

- [ ] Supabaseアカウント作成完了
- [ ] プロジェクト作成完了
- [ ] SQLクエリ実行完了
- [ ] APIキー取得完了
- [ ] supabase-sync.js編集完了
- [ ] Vercelデプロイ完了
- [ ] データ入力テスト完了
- [ ] 別デバイスで確認完了

全部チェックできたら完璧です！👏