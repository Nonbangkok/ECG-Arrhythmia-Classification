#!/bin/bash

echo "🚀 เริ่มต้นระบบจำแนกประเภทคลื่นไฟฟ้าหัวใจ"
echo "=========================================="

# ตรวจสอบว่า Node.js ติดตั้งแล้วหรือไม่
if ! command -v node &> /dev/null; then
    echo "❌ ไม่พบ Node.js กรุณาติดตั้ง Node.js ก่อน"
    echo "ดาวน์โหลดได้ที่: https://nodejs.org/"
    exit 1
fi

# ตรวจสอบว่า Python ติดตั้งแล้วหรือไม่
if ! command -v python3 &> /dev/null; then
    echo "❌ ไม่พบ Python3 กรุณาติดตั้ง Python3 ก่อน"
    echo "ดาวน์โหลดได้ที่: https://python.org/"
    exit 1
fi

# ตรวจสอบว่า npm ติดตั้งแล้วหรือไม่
if ! command -v npm &> /dev/null; then
    echo "❌ ไม่พบ npm กรุณาติดตั้ง npm ก่อน"
    exit 1
fi

echo "✅ ตรวจสอบ dependencies เรียบร้อย"

# ตรวจสอบว่า virtual environment มีอยู่หรือไม่
if [ ! -d "venv" ]; then
    echo "📦 สร้าง virtual environment..."
    python3 -m venv venv
fi

# ตรวจสอบว่า Node.js dependencies ติดตั้งแล้วหรือไม่
if [ ! -d "node_modules" ]; then
    echo "📥 ติดตั้ง Node.js dependencies..."
    npm install
fi

echo "✅ การติดตั้งเสร็จสิ้น"
echo ""
echo "🌐 เริ่มต้นเซิร์ฟเวอร์..."
echo "=========================================="

# เริ่มต้น Flask backend ในพื้นหลัง
echo "🐍 เริ่มต้น Flask backend (http://localhost:5000)..."
cd server
python app.py &
FLASK_PID=$!
cd ..

# รอสักครู่ให้ Flask เริ่มต้น
sleep 3

# เริ่มต้น Next.js frontend
echo "⚛️  เริ่มต้น Next.js frontend (http://localhost:3000)..."
npm run dev &
NEXT_PID=$!

echo ""
echo "🎉 ระบบพร้อมใช้งาน!"
echo "=========================================="
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo ""
echo "กด Ctrl+C เพื่อหยุดเซิร์ฟเวอร์"

# ฟังก์ชันสำหรับหยุดเซิร์ฟเวอร์
cleanup() {
    echo ""
    echo "🛑 หยุดเซิร์ฟเวอร์..."
    kill $FLASK_PID 2>/dev/null
    kill $NEXT_PID 2>/dev/null
    echo "✅ หยุดเซิร์ฟเวอร์เรียบร้อย"
    exit 0
}

# จับสัญญาณ Ctrl+C
trap cleanup SIGINT

# รอให้เซิร์ฟเวอร์ทำงาน
wait 