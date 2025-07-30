#!/bin/bash

echo "🔄 รีสตาร์ท Flask Backend"
echo "=========================="

# หยุด Flask process ที่ทำงานอยู่
echo "🛑 หยุด Flask process ที่ทำงานอยู่..."
pkill -f "python.*app.py" 2>/dev/null

# รอสักครู่
sleep 2

# ตรวจสอบว่า virtual environment มีอยู่หรือไม่
if [ ! -d "venv" ]; then
    echo "❌ ไม่พบ virtual environment กรุณารัน setup-venv.sh ก่อน"
    exit 1
fi

# เปิดใช้งาน virtual environment
echo "🔧 เปิดใช้งาน virtual environment..."
source venv/bin/activate

# เริ่มต้น Flask backend ใหม่
echo "🐍 เริ่มต้น Flask backend ใหม่..."
cd server
python app.py &
FLASK_PID=$!
cd ..

echo "✅ Flask backend เริ่มต้นใหม่เรียบร้อย (PID: $FLASK_PID)"
echo "🌐 เข้าถึงได้ที่: http://localhost:5000"
echo ""
echo "กด Ctrl+C เพื่อหยุด"

# ฟังก์ชันสำหรับหยุดเซิร์ฟเวอร์
cleanup() {
    echo ""
    echo "🛑 หยุด Flask backend..."
    kill $FLASK_PID 2>/dev/null
    echo "✅ หยุด Flask backend เรียบร้อย"
    exit 0
}

# จับสัญญาณ Ctrl+C
trap cleanup SIGINT

# รอให้เซิร์ฟเวอร์ทำงาน
wait 