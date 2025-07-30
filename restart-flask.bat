@echo off
chcp 65001 >nul
echo 🔄 รีสตาร์ท Flask Backend
echo ==========================

REM หยุด Flask process ที่ทำงานอยู่
echo 🛑 หยุด Flask process ที่ทำงานอยู่...
taskkill /f /im python.exe 2>nul

REM รอสักครู่
timeout /t 2 /nobreak >nul

REM ตรวจสอบว่า virtual environment มีอยู่หรือไม่
if not exist "venv" (
    echo ❌ ไม่พบ virtual environment กรุณารัน setup-venv.bat ก่อน
    pause
    exit /b 1
)

REM เปิดใช้งาน virtual environment
echo 🔧 เปิดใช้งาน virtual environment...
call venv\Scripts\activate.bat

REM เริ่มต้น Flask backend ใหม่
echo 🐍 เริ่มต้น Flask backend ใหม่...
cd server
start /B python app.py
cd ..

echo ✅ Flask backend เริ่มต้นใหม่เรียบร้อย
echo 🌐 เข้าถึงได้ที่: http://localhost:5000
echo.
echo กดปุ่มใดๆ เพื่อออก
pause 