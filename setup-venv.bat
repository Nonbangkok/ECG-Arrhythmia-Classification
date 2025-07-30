@echo off
chcp 65001 >nul
echo 🚀 การตั้งค่า Python Virtual Environment สำหรับระบบจำแนกประเภทคลื่นไฟฟ้าหัวใจ
echo ==========================================================================

REM ตรวจสอบว่า Python ติดตั้งแล้วหรือไม่
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ไม่พบ Python กรุณาติดตั้ง Python ก่อน
    echo ดาวน์โหลดได้ที่: https://python.org/
    pause
    exit /b 1
)

REM ตรวจสอบว่า pip ติดตั้งแล้วหรือไม่
pip --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ไม่พบ pip กรุณาติดตั้ง pip ก่อน
    pause
    exit /b 1
)

echo ✅ ตรวจสอบ Python และ pip เรียบร้อย

REM สร้าง virtual environment
echo 📦 สร้าง virtual environment...
python -m venv venv

REM เปิดใช้งาน virtual environment
echo 🔧 เปิดใช้งาน virtual environment...
call venv\Scripts\activate.bat

REM อัปเกรด pip และ setuptools
echo ⬆️ อัปเกรด pip และ setuptools...
pip install --upgrade pip setuptools wheel

REM ติดตั้ง requirements
echo 📥 ติดตั้ง requirements...
pip install -r requirements.txt

echo.
echo ✅ การตั้งค่าเสร็จสิ้น!
echo ==========================================
echo เพื่อเปิดใช้งาน environment ให้รัน:
echo    venv\Scripts\activate.bat
echo.
echo เพื่อรัน Flask server:
echo    cd server ^&^& python app.py
echo.
echo เพื่อเริ่มต้นทั้งระบบ:
echo    start-dev.bat
pause 