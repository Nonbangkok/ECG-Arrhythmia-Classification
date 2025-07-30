#!/bin/bash

echo "🚀 การตั้งค่า Python Virtual Environment สำหรับระบบจำแนกประเภทคลื่นไฟฟ้าหัวใจ"
echo "=========================================================================="

# ตรวจสอบว่า Python ติดตั้งแล้วหรือไม่
if ! command -v python3 &> /dev/null; then
    echo "❌ ไม่พบ Python3 กรุณาติดตั้ง Python3 ก่อน"
    echo "ดาวน์โหลดได้ที่: https://python.org/"
    exit 1
fi

# ตรวจสอบว่า pip ติดตั้งแล้วหรือไม่
if ! command -v pip3 &> /dev/null; then
    echo "❌ ไม่พบ pip3 กรุณาติดตั้ง pip3 ก่อน"
    exit 1
fi

echo "✅ ตรวจสอบ Python และ pip เรียบร้อย"

# สร้าง virtual environment
echo "📦 สร้าง virtual environment..."
python3 -m venv venv

# เปิดใช้งาน virtual environment
echo "🔧 เปิดใช้งาน virtual environment..."
source venv/bin/activate

# อัปเกรด pip และ setuptools
echo "⬆️ อัปเกรด pip และ setuptools..."
pip install --upgrade pip setuptools wheel

# ติดตั้ง requirements
echo "📥 ติดตั้ง requirements..."
pip install -r requirements.txt

echo ""
echo "✅ การตั้งค่าเสร็จสิ้น!"
echo "=========================================="
echo "เพื่อเปิดใช้งาน environment ให้รัน:"
echo "   source venv/bin/activate"
echo ""
echo "เพื่อรัน Flask server:"
echo "   cd server && python app.py"
echo ""
echo "เพื่อเริ่มต้นทั้งระบบ:"
echo "   ./start-dev.sh" 