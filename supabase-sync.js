// Supabase Configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Supabaseプロジェクトから取得
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Supabaseプロジェクトから取得

// Supabaseクライアントの初期化
let supabase = null;

// ユーザーIDの生成または取得
function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', userId);
    }
    return userId;
}

// Supabaseの初期化
function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        return true;
    }
    return false;
}

// データをSupabaseに保存
async function saveToSupabase(dataType, data) {
    if (!supabase) return false;
    
    const userId = getUserId();
    const timestamp = new Date().toISOString();
    
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
        return true;
    } catch (error) {
        console.error('Supabase save error:', error);
        return false;
    }
}

// Supabaseからデータを取得
async function loadFromSupabase(dataType) {
    if (!supabase) return null;
    
    const userId = getUserId();
    
    try {
        const { data, error } = await supabase
            .from('sales_data')
            .select('data, updated_at')
            .eq('user_id', userId)
            .eq('data_type', dataType)
            .single();
        
        if (error) throw error;
        
        if (data) {
            return {
                data: JSON.parse(data.data),
                updatedAt: data.updated_at
            };
        }
        return null;
    } catch (error) {
        console.error('Supabase load error:', error);
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

// リアルタイム同期の設定
function setupRealtimeSync() {
    if (!supabase) return;
    
    const userId = getUserId();
    
    // リアルタイム更新の購読
    supabase
        .channel('sales_data_changes')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'sales_data',
            filter: `user_id=eq.${userId}`
        }, async (payload) => {
            console.log('Data changed:', payload);
            
            // 他のデバイスからの更新を検知
            if (payload.new) {
                const dataType = payload.new.data_type;
                const data = JSON.parse(payload.new.data);
                const updatedAt = payload.new.updated_at;
                
                // ローカルストレージを更新
                switch(dataType) {
                    case 'calendar':
                        localStorage.setItem('calendarData', JSON.stringify(data));
                        localStorage.setItem('calendarDataUpdated', updatedAt);
                        if (typeof updateCalendar === 'function') updateCalendar();
                        break;
                    case 'weekly':
                        localStorage.setItem('weeklyData', JSON.stringify(data));
                        localStorage.setItem('weeklyDataUpdated', updatedAt);
                        if (typeof updateCalendar === 'function') updateCalendar();
                        break;
                    case 'deposit':
                        localStorage.setItem('depositData', JSON.stringify(data));
                        localStorage.setItem('depositDataUpdated', updatedAt);
                        if (typeof updateDepositTable === 'function') updateDepositTable();
                        break;
                    case 'withdraw':
                        localStorage.setItem('withdrawData', JSON.stringify(data));
                        localStorage.setItem('withdrawDataUpdated', updatedAt);
                        if (typeof updateWithdrawTable === 'function') updateWithdrawTable();
                        break;
                }
                
                // 画面を更新
                if (typeof showAutoSaveIndicator === 'function') {
                    showAutoSaveIndicator();
                }
            }
        })
        .subscribe();
}