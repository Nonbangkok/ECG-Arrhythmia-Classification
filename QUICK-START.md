# 🚀 เริ่มต้นใช้งานอย่างรวดเร็ว

## 📋 **ข้อกำหนด**

- **Node.js 18+** - [ดาวน์โหลด](https://nodejs.org/)
- **Python 3.8-3.11** - [ดาวน์โหลด](https://python.org/)
- **Git** - [ดาวน์โหลด](https://git-scm.com/)

## ⚡ **เริ่มต้นใน 3 ขั้นตอน**

### **1. Clone โปรเจกต์**
```bash
git clone <repository-url>
cd ECG-Arrhythmia-Classification
```

### **2. ตั้งค่า Environment**

#### **สำหรับ macOS/Linux:**
```bash
# ตั้งค่า virtual environment และติดตั้ง dependencies
./setup-venv.sh

# หรือทำทีละขั้นตอน:
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
npm install
```

#### **สำหรับ Windows:**
```cmd
# ตั้งค่า virtual environment และติดตั้ง dependencies
setup-venv.bat

# หรือทำทีละขั้นตอน:
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
npm install
```

### **3. เริ่มต้นเซิร์ฟเวอร์**

#### **สำหรับ macOS/Linux:**
```bash
# เริ่มต้นทั้ง Flask backend และ Next.js frontend
./start-dev.sh
```

#### **สำหรับ Windows:**
```cmd
# เริ่มต้นทั้ง Flask backend และ Next.js frontend
start-dev.bat
```

## 🌐 **เข้าถึงระบบ**

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🎯 **การใช้งาน**

1. **เปิดเบราว์เซอร์ไปที่** http://localhost:3000
2. **เลือกข้อมูลตัวอย่าง** จากเมนู dropdown
3. **กดปุ่ม "Predict"** เพื่อจำแนกประเภท
4. **เลือกประเภทจากแพทย์** และกด "Confirm"
5. **ดูแดชบอร์ด** โดยคลิกปุ่มลอยด้านซ้ายล่าง

## 🔧 **การแก้ไขปัญหา**

### **หากเจอ "Error loading sample data":**
```bash
# รีสตาร์ท Flask backend
./restart-flask.sh  # macOS/Linux
restart-flask.bat   # Windows
```

### **หากเจอ "ModuleNotFoundError":**
```bash
# สร้าง virtual environment ใหม่
./setup-venv.sh  # macOS/Linux
setup-venv.bat   # Windows
```

### **หากเจอ "Port already in use":**
```bash
# หยุด process ที่ใช้ port 5000 และ 3000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
lsof -ti:3000 | xargs kill -9  # macOS/Linux
```

## 📱 **การใช้งานบนมือถือ**

ระบบรองรับการใช้งานบนมือถือ:
- เปิดเบราว์เซอร์บนมือถือ
- ไปที่ IP address ของคอมพิวเตอร์: http://[IP]:3000
- ตัวอย่าง: http://192.168.1.100:3000

## 🛠️ **คำสั่งที่มีประโยชน์**

```bash
# เริ่มต้นเฉพาะ Flask backend
cd server && python app.py

# เริ่มต้นเฉพาะ Next.js frontend
npm run dev

# สร้าง production build
npm run build

# เริ่มต้น production server
npm start

# ตรวจสอบ dependencies
npm list
pip list
```

## 📞 **ความช่วยเหลือ**

หากมีปัญหา:
1. ตรวจสอบ [DEVELOPMENT.md](DEVELOPMENT.md)
2. ดู logs ใน terminal
3. เปิด Developer Tools ในเบราว์เซอร์
4. ตรวจสอบ Network tab สำหรับ API calls

---

**�� ระบบพร้อมใช้งาน!** 