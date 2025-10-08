// Supabase Configuration
const SUPABASE_URL = 'https://qddyqqmpqqkkbibplsmn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZHlxcW1wcXFra2JpYnBsc21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NTc5MTgsImV4cCI6MjA3MzIzMzkxOH0.KAgZ8D5cRgdPS-AoIeG7bwFiNzbGV8TW22rhGLft6sY';

// Supabaseクライアントの初期化
let supabase = null;

// ユーザーIDの生成または取得
function getUserId() {
    // 全デバイスで共通のIDを使用（チーム共有用）
    // 個人利用の場合はこのIDをそのまま使用
    // チーム利用の場合は'team_2024'などに変更
    return 'shared_user_2024';
    
    // 元のコード（個別管理したい場合はコメントを外す）
    // let userId = localStorage.getItem('userId');
    // if (!userId) {
    //     userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    //     localStorage.setItem('userId', userId);
    // }
    // return userId;
}

// Supabaseの初期化
function initSupabase() {
    console.log('Supabase初期化を試みています...');
    console.log('SUPABASE_URL:', SUPABASE_URL);
    console.log('SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? 'キーが設定されています' : 'キーが設定されていません');
    
    if (typeof window.supabase !== 'undefined') {
        try {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabaseクライアント作成成功');
            return true;
        } catch (error) {
            console.error('Supabaseクライアント作成エラー:', error);
            return false;
        }
    }
    console.error('Supabase SDKが読み込まれていません');
    return false;
}

// データをSupabaseに保存
async function saveToSupabase(dataType, data) {
    if (!supabase) {
        console.error('Supabaseクライアントが初期化されていません');
        return false;
    }
    
    const userId = getUserId();
    const timestamp = new Date().toISOString();
    
    console.log(`データ保存中... タイプ: ${dataType}, ユーザーID: ${userId}`);
    
    try {
        const { error } = await supabase
            .from('sales_data')
            .upsert({
                user_id: userId,
                data_type: dataType,
                data: JSON.stringify(data),
                updated_at: timestamp
            }, {
                onConflict: 'user_id,data_type'
            });
        
        if (error) throw error;
        console.log(`データ保存成功: ${dataType}`);
        return true;
    } catch (error) {
        console.error('Supabase save error:', error);
        console.error('エラー詳細:', error.message, error.details);
        return false;
    }
}

// Supabaseからデータを取得
async function loadFromSupabase(dataType) {
    if (!supabase) {
        console.error('Supabaseクライアントが初期化されていません');
        return null;
    }
    
    const userId = getUserId();
    console.log(`データ取得中... タイプ: ${dataType}, ユーザーID: ${userId}`);
    
    try {
        const { data, error } = await supabase
            .from('sales_data')
            .select('data, updated_at')
            .eq('user_id', userId)
            .eq('data_type', dataType)
            .single();
        
        if (error) {
            if (error.code === 'PGRST116') {
                console.log(`データが見つかりません: ${dataType}`);
            } else {
                throw error;
            }
        }
        
        if (data) {
            console.log(`データ取得成功: ${dataType}, 更新日時: ${data.updated_at}`);
            return {
                data: JSON.parse(data.data),
                updatedAt: data.updated_at
            };
        }
        return null;
    } catch (error) {
        console.error('Supabase load error:', error);
        console.error('エラー詳細:', error.message, error.details);
        return null;
    }
}

// 全データを同期
async function syncAllData() {
    if (!supabase) {
        console.log('Supabase not initialized');
        return false;
    }
    
    try {
        // ローカルデータを取得
        const localCalendarData = localStorage.getItem('calendarData');
        const localWeeklyData = localStorage.getItem('weeklyData');
        const localDepositData = localStorage.getItem('depositData');
        const localWithdrawData = localStorage.getItem('withdrawData');
        
        // Supabaseからデータを取得
        const remoteCalendar = await loadFromSupabase('calendar');
        const remoteWeekly = await loadFromSupabase('weekly');
        const remoteDeposit = await loadFromSupabase('deposit');
        const remoteWithdraw = await loadFromSupabase('withdraw');
        
        // データのマージ（最新のデータを優先）
        let needsUpdate = false;
        
        // カレンダーデータの同期
        if (localCalendarData) {
            const localData = JSON.parse(localCalendarData);
            if (!remoteCalendar || new Date(localStorage.getItem('calendarDataUpdated') || 0) > new Date(remoteCalendar.updatedAt)) {
                await saveToSupabase('calendar', localData);
                needsUpdate = true;
            } else if (remoteCalendar && new Date(remoteCalendar.updatedAt) > new Date(localStorage.getItem('calendarDataUpdated') || 0)) {
                localStorage.setItem('calendarData', JSON.stringify(remoteCalendar.data));
                localStorage.setItem('calendarDataUpdated', remoteCalendar.updatedAt);
                needsUpdate = true;
            }
        } else if (remoteCalendar) {
            localStorage.setItem('calendarData', JSON.stringify(remoteCalendar.data));
            localStorage.setItem('calendarDataUpdated', remoteCalendar.updatedAt);
            needsUpdate = true;
        }
        
        // 週次データの同期
        if (localWeeklyData) {
            const localData = JSON.parse(localWeeklyData);
            if (!remoteWeekly || new Date(localStorage.getItem('weeklyDataUpdated') || 0) > new Date(remoteWeekly.updatedAt)) {
                await saveToSupabase('weekly', localData);
            } else if (remoteWeekly && new Date(remoteWeekly.updatedAt) > new Date(localStorage.getItem('weeklyDataUpdated') || 0)) {
                localStorage.setItem('weeklyData', JSON.stringify(remoteWeekly.data));
                localStorage.setItem('weeklyDataUpdated', remoteWeekly.updatedAt);
                needsUpdate = true;
            }
        } else if (remoteWeekly) {
            localStorage.setItem('weeklyData', JSON.stringify(remoteWeekly.data));
            localStorage.setItem('weeklyDataUpdated', remoteWeekly.updatedAt);
            needsUpdate = true;
        }
        
        // 入金データの同期
        if (localDepositData) {
            const localData = JSON.parse(localDepositData);
            if (!remoteDeposit || new Date(localStorage.getItem('depositDataUpdated') || 0) > new Date(remoteDeposit.updatedAt)) {
                await saveToSupabase('deposit', localData);
            } else if (remoteDeposit && new Date(remoteDeposit.updatedAt) > new Date(localStorage.getItem('depositDataUpdated') || 0)) {
                localStorage.setItem('depositData', JSON.stringify(remoteDeposit.data));
                localStorage.setItem('depositDataUpdated', remoteDeposit.updatedAt);
                needsUpdate = true;
            }
        } else if (remoteDeposit) {
            localStorage.setItem('depositData', JSON.stringify(remoteDeposit.data));
            localStorage.setItem('depositDataUpdated', remoteDeposit.updatedAt);
            needsUpdate = true;
        }
        
        // 出金データの同期
        if (localWithdrawData) {
            const localData = JSON.parse(localWithdrawData);
            if (!remoteWithdraw || new Date(localStorage.getItem('withdrawDataUpdated') || 0) > new Date(remoteWithdraw.updatedAt)) {
                await saveToSupabase('withdraw', localData);
            } else if (remoteWithdraw && new Date(remoteWithdraw.updatedAt) > new Date(localStorage.getItem('withdrawDataUpdated') || 0)) {
                localStorage.setItem('withdrawData', JSON.stringify(remoteWithdraw.data));
                localStorage.setItem('withdrawDataUpdated', remoteWithdraw.updatedAt);
                needsUpdate = true;
            }
        } else if (remoteWithdraw) {
            localStorage.setItem('withdrawData', JSON.stringify(remoteWithdraw.data));
            localStorage.setItem('withdrawDataUpdated', remoteWithdraw.updatedAt);
            needsUpdate = true;
        }
        
        return needsUpdate;
    } catch (error) {
        console.error('Sync error:', error);
        return false;
    }
}

// リアルタイム同期の設定（5秒ごとのポーリング）
let syncInterval = null;
let lastSyncTime = Date.now();

function setupRealtimeSync() {
    if (!supabase) return;

    console.log('リアルタイム同期を開始します（5秒ごと）');

    // 既存のインターバルをクリア
    if (syncInterval) {
        clearInterval(syncInterval);
    }

    // 5秒ごとにデータを同期
    syncInterval = setInterval(async () => {
        try {
            const userId = getUserId();

            // Supabaseから最新データを取得
            const remoteCalendar = await loadFromSupabase('calendar');
            const remoteWeekly = await loadFromSupabase('weekly');
            const remoteDeposit = await loadFromSupabase('deposit');
            const remoteWithdraw = await loadFromSupabase('withdraw');

            let hasUpdates = false;

            // カレンダーデータの確認と更新（JSON比較方式）
            if (remoteCalendar) {
                const localData = localStorage.getItem('calendarData');
                const remoteDataJson = JSON.stringify(remoteCalendar.data);
                if (localData !== remoteDataJson) {
                    localStorage.setItem('calendarData', remoteDataJson);
                    localStorage.setItem('calendarDataUpdated', remoteCalendar.updatedAt);
                    if (typeof updateCalendar === 'function') updateCalendar();
                    hasUpdates = true;
                }
            }

            // 週次データの確認と更新（JSON比較方式）
            if (remoteWeekly) {
                const localData = localStorage.getItem('weeklyData');
                const remoteDataJson = JSON.stringify(remoteWeekly.data);
                if (localData !== remoteDataJson) {
                    localStorage.setItem('weeklyData', remoteDataJson);
                    localStorage.setItem('weeklyDataUpdated', remoteWeekly.updatedAt);
                    if (typeof updateCalendar === 'function') updateCalendar();
                    hasUpdates = true;
                }
            }

            // 入金データの確認と更新（JSON比較方式）
            if (remoteDeposit) {
                const localData = localStorage.getItem('depositData');
                const remoteDataJson = JSON.stringify(remoteDeposit.data);
                if (localData !== remoteDataJson) {
                    localStorage.setItem('depositData', remoteDataJson);
                    localStorage.setItem('depositDataUpdated', remoteDeposit.updatedAt);
                    if (typeof updateDepositTable === 'function') updateDepositTable();
                    hasUpdates = true;
                }
            }

            // 出金データの確認と更新（JSON比較方式）
            if (remoteWithdraw) {
                const localData = localStorage.getItem('withdrawData');
                const remoteDataJson = JSON.stringify(remoteWithdraw.data);
                if (localData !== remoteDataJson) {
                    localStorage.setItem('withdrawData', remoteDataJson);
                    localStorage.setItem('withdrawDataUpdated', remoteWithdraw.updatedAt);
                    if (typeof updateWithdrawTable === 'function') updateWithdrawTable();
                    hasUpdates = true;
                }
            }

            // 更新があった場合は画面に表示
            if (hasUpdates) {
                console.log('他デバイスからの更新を検知しました');
                if (typeof showAutoSaveIndicator === 'function') {
                    showAutoSaveIndicator();
                }
            }

            lastSyncTime = Date.now();

        } catch (error) {
            console.error('リアルタイム同期エラー:', error);
        }
    }, 5000); // 5秒ごと

    // ページを離れるときにインターバルをクリア
    window.addEventListener('beforeunload', () => {
        if (syncInterval) {
            clearInterval(syncInterval);
        }
    });
}

// 同期を停止
function stopRealtimeSync() {
    if (syncInterval) {
        clearInterval(syncInterval);
        syncInterval = null;
        console.log('リアルタイム同期を停止しました');
    }
}