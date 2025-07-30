@echo off
chcp 65001 >nul
echo 🚀 เริ่มต้นระบบจำแนกประเภทคลื่นไฟฟ้าหัวใจ
echo ==========================================

REM ตรวจสอบว่า Node.js ติดตั้งแล้วหรือไม่
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ไม่พบ Node.js กรุณาติดตั้ง Node.js ก่อน
    echo ดาวน์โหลดได้ที่: https://nodejs.org/
    pause
    exit /b 1
)

REM ตรวจสอบว่า Python ติดตั้งแล้วหรือไม่
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ไม่พบ Python กรุณาติดตั้ง Python ก่อน
    echo ดาวน์โหลดได้ที่: https://python.org/
    pause
    exit /b 1
)

REM ตรวจสอบว่า npm ติดตั้งแล้วหรือไม่
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ไม่พบ npm กรุณาติดตั้ง npm ก่อน
    pause
    exit /b 1
)

echo ✅ ตรวจสอบ dependencies เรียบร้อย


REM ตรวจสอบว่า Node.js dependencies ติดตั้งแล้วหรือไม่
if not exist "node_modules" (
    echo 📥 ติดตั้ง Node.js dependencies...
    npm install
)

echo ✅ การติดตั้งเสร็จสิ้น
echo.
echo 🌐 เริ่มต้นเซิร์ฟเวอร์...
echo ==========================================

REM เริ่มต้น Flask backend ในพื้นหลัง
echo 🐍 เริ่มต้น Flask backend (http://localhost:5000)...
cd server
start /B python app.py
cd ..

REM รอสักครู่ให้ Flask เริ่มต้น
timeout /t 3 /nobreak >nul

REM เริ่มต้น Next.js frontend
echo ⚛️  เริ่มต้น Next.js frontend (http://localhost:3000)...
start /B npm run dev

echo.
echo 🎉 ระบบพร้อมใช้งาน!
echo ==========================================
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5000
echo.
echo กด Ctrl+C เพื่อหยุดเซิร์ฟเวอร์
echo.

REM รอให้ผู้ใช้กดปุ่มใดๆ
pause 