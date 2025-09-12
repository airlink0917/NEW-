@echo off
echo ========================================
echo 売上カレンダー ローカルサーバー起動
echo ========================================
echo.
echo ブラウザで以下のURLにアクセスしてください：
echo.
echo http://localhost:8080/dashboard.html
echo.
echo 停止するには Ctrl + C を押してください
echo.
python -m http.server 8080
pause