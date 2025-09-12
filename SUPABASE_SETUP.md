# Supabaseセットアップ手順

## データ同期機能を有効にする方法

この売上管理システムは、Supabaseを使用してデバイス間でデータを同期できます。以下の手順でセットアップしてください。

## 1. Supabaseアカウントの作成

1. [Supabase](https://supabase.com) にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでサインイン（無料）

## 2. プロジェクトの作成

1. 「New Project」をクリック
2. プロジェクト名: `sales-management`（任意）
3. データベースパスワードを設定（忘れないように保存）
4. リージョン: `Northeast Asia (Tokyo)` を選択
5. 「Create new project」をクリック

## 3. データベーステーブルの作成

Supabaseダッシュボードで以下のSQLを実行：

```sql
-- sales_dataテーブルの作成
CREATE TABLE sales_data (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    data_type VARCHAR(20) NOT NULL,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, data_type)
);

-- インデックスの作成
CREATE INDEX idx_sales_data_user_id ON sales_data(user_id);
CREATE INDEX idx_sales_data_type ON sales_data(data_type);

-- RLS（Row Level Security）を有効化
ALTER TABLE sales_data ENABLE ROW LEVEL SECURITY;

-- 全ユーザーがCRUD操作できるポリシーを作成
CREATE POLICY "Enable all operations for all users" ON sales_data
    FOR ALL USING (true) WITH CHECK (true);
```

## 4. APIキーの取得

1. Supabaseダッシュボードの左メニューから「Settings」→「API」を選択
2. 以下の2つの値をコピー：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 5. dashboard.htmlの設定

1. `dashboard.html`をテキストエディタで開く
2. 以下の部分を見つけて、取得した値に置き換える：

```html
<!-- Supabase SDKを追加（</head>タグの前に） -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-sync.js"></script>
```

3. `supabase-sync.js`ファイルを開いて、以下を編集：

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // ここに Project URL を貼り付け
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // ここに anon public を貼り付け
```

例：
```javascript
const SUPABASE_URL = 'https://abcdefghijk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## 6. 同期機能の有効化

`dashboard.html`の`window.onload`関数内に以下を追加：

```javascript
// Supabase同期の初期化
if (initSupabase()) {
    syncAllData().then(needsUpdate => {
        if (needsUpdate) {
            loadData();
            updateCalendar();
            updateStats();
        }
    });
    setupRealtimeSync();
    
    // 定期的な同期
    setInterval(() => {
        syncAllData();
    }, 30000); // 30秒ごとに同期
}
```

## 7. デプロイ

1. 変更したファイルをGitHubにプッシュ
2. Vercelが自動的にデプロイ
3. 複数のデバイスでアクセスして動作確認

## 使い方

- **初回アクセス時**: 自動的にユーザーIDが生成されます
- **データ入力**: 通常通り使用（自動的に同期されます）
- **別デバイスでアクセス**: 同じユーザーIDでデータが共有されます
- **手動同期**: 必要に応じて「手動バックアップ」ボタンをクリック

## トラブルシューティング

### データが同期されない場合

1. ブラウザのコンソールでエラーを確認
2. Supabaseの設定が正しいか確認
3. インターネット接続を確認

### ユーザーIDを共有したい場合

1. ブラウザの開発者ツールを開く
2. コンソールで `localStorage.getItem('userId')` を実行
3. 表示されたIDを別デバイスで設定：
   ```javascript
   localStorage.setItem('userId', 'コピーしたID');
   ```

## セキュリティに関する注意

- APIキーは公開キー（anon key）のみを使用
- 重要なデータは適切にバックアップを取る
- 定期的にデータをダウンロードして保存

## 無料プランの制限

Supabaseの無料プランには以下の制限があります：
- ストレージ: 1GB
- 帯域幅: 2GB/月
- API呼び出し: 無制限

通常の使用では十分な容量です。