# 🛠️ คู่มือการพัฒนา - ระบบจำแนกประเภทคลื่นไฟฟ้าหัวใจ

## 🚀 **การเริ่มต้นอย่างรวดเร็ว**

### **สำหรับ macOS/Linux:**
```bash
# ตั้งค่า virtual environment
./setup-venv.sh

# เริ่มต้นเซิร์ฟเวอร์พัฒนา
./start-dev.sh
```

### **สำหรับ Windows:**
```cmd
# ตั้งค่า virtual environment
setup-venv.bat

# เริ่มต้นเซิร์ฟเวอร์พัฒนา
start-dev.bat
```

## 📁 **โครงสร้างไฟล์**

```
ECG-Arrhythmia-Classification/
├── data/                    # ข้อมูลตัวอย่างคลื่นไฟฟ้าหัวใจ
│   ├── csv/                # ไฟล์ CSV ตัวอย่าง
│   ├── mismatch/           # ข้อมูลที่ไม่ตรงกัน
│   └── old/                # ข้อมูลเก่า
├── database/               # ฐานข้อมูล
│   └── classifications.csv # ข้อมูลการจำแนกประเภท
├── model/                  # โมเดล AI
│   ├── model.h5           # โมเดลที่เทรนแล้ว
│   └── Model_Architecture.json # โครงสร้างโมเดล
├── server/                 # Backend (Flask)
│   └── app.py             # API server
├── src/                    # Frontend (Next.js)
│   ├── app/               # หน้าเว็บ
│   │   ├── page.tsx       # หน้าหลัก
│   │   ├── dashboard/     # แดชบอร์ด
│   │   └── license/       # หน้าใบอนุญาต
│   ├── components/        # React components
│   │   ├── ECGChart.tsx   # กราฟคลื่นไฟฟ้าหัวใจ
│   │   ├── DashboardChart.tsx # กราฟแดชบอร์ด
│   │   └── FloatingButton.tsx # ปุ่มลอย
│   ├── lib/               # utilities
│   │   └── api.ts         # API client
│   └── types/             # TypeScript types
│       └── index.ts       # type definitions
├── scripts/                # Scripts สำหรับ platform ต่างๆ
├── requirements.txt        # Python dependencies
├── package.json           # Node.js dependencies
└── README.md              # คู่มือการใช้งาน
```

## 🔧 **API Endpoints**

### **Backend (Flask) - http://localhost:5000**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/predict` | จำแนกประเภทคลื่นไฟฟ้าหัวใจ |
| `POST` | `/plot` | สร้างกราฟคลื่นไฟฟ้าหัวใจ |
| `GET` | `/data/<path>` | ดึงข้อมูลไฟล์ |
| `GET` | `/dashboard_data` | ดึงข้อมูลแดชบอร์ด |
| `POST` | `/save_classification` | บันทึกการจำแนกประเภท |
| `POST` | `/dashboard_update_row` | อัปเดตข้อมูล |
| `POST` | `/dashboard_delete_row` | ลบข้อมูล |

### **Frontend (Next.js) - http://localhost:3000**

| Route | Description |
|-------|-------------|
| `/` | หน้าหลัก |
| `/dashboard` | แดชบอร์ด |
| `/license` | หน้าใบอนุญาต |

## 🐛 **การแก้ไขปัญหา**

### **ปัญหาที่พบบ่อย:**

#### **1. "Error loading sample data"**
```bash
# ตรวจสอบว่า Flask backend ทำงานอยู่หรือไม่
curl http://localhost:5000/

# รีสตาร์ท Flask backend
./restart-flask.sh  # macOS/Linux
restart-flask.bat   # Windows
```

#### **2. "ModuleNotFoundError: No module named 'distutils'"**
```bash
# อัปเกรด setuptools
pip install --upgrade setuptools

# หรือสร้าง virtual environment ใหม่
./setup-venv.sh  # macOS/Linux
setup-venv.bat   # Windows
```

#### **3. "Expected 187 values, got 186"**
- ตรวจสอบว่าไฟล์ CSV มี 187 ค่า
- ตรวจสอบการ parse ข้อมูลใน `src/lib/api.ts`

#### **4. "404 This page could not be found"**
- ตรวจสอบว่าไฟล์ `src/app/page.tsx` มีอยู่
- รีสตาร์ท Next.js server

#### **5. "Network Error"**
- ตรวจสอบ CORS ใน Flask backend
- ตรวจสอบว่า Flask backend ทำงานที่ port 5000

### **การ Debug:**

#### **Frontend Debug:**
```bash
# เปิด Developer Tools ในเบราว์เซอร์
# ดู Console และ Network tabs
```

#### **Backend Debug:**
```bash
# เพิ่ม print statements ใน app.py
# ดู logs ใน terminal
```

## 🔄 **การรีสตาร์ทเซิร์ฟเวอร์**

### **รีสตาร์ท Flask Backend:**
```bash
# macOS/Linux
./restart-flask.sh

# Windows
restart-flask.bat
```

### **รีสตาร์ท Next.js Frontend:**
```bash
# กด Ctrl+C ใน terminal ที่รัน npm run dev
# แล้วรันใหม่
npm run dev
```

### **รีสตาร์ททั้งระบบ:**
```bash
# macOS/Linux
./start-dev.sh

# Windows
start-dev.bat
```

## 📊 **การทดสอบ**

### **ทดสอบ API Endpoints:**
```bash
# ทดสอบ Flask backend
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"input": [0.1, 0.2, ...]}'

# ทดสอบ data endpoint
curl http://localhost:5000/data/csv/c0.csv
```

### **ทดสอบ Frontend:**
```bash
# เปิดเบราว์เซอร์ไปที่ http://localhost:3000
# ทดสอบการโหลด sample data
# ทดสอบการอัปโหลดไฟล์ CSV
```

## 🚀 **การ Deploy**

### **Development:**
```bash
# เริ่มต้นเซิร์ฟเวอร์พัฒนา
./start-dev.sh  # macOS/Linux
start-dev.bat   # Windows
```

### **Production:**
```bash
# สร้าง production build
npm run build

# เริ่มต้น production server
npm start
```

## 📝 **การเพิ่มฟีเจอร์ใหม่**

### **1. เพิ่ม API Endpoint:**
```python
# ใน server/app.py
@app.route('/new_endpoint', methods=['POST'])
def new_endpoint():
    # โค้ดใหม่
    return jsonify({'result': 'success'})
```

### **2. เพิ่ม Frontend Component:**
```typescript
// ใน src/components/NewComponent.tsx
export default function NewComponent() {
    // โค้ดใหม่
    return <div>New Component</div>
}
```

### **3. เพิ่มหน้าใหม่:**
```typescript
// ใน src/app/new-page/page.tsx
export default function NewPage() {
    // โค้ดใหม่
    return <div>New Page</div>
}
```

## 🔧 **การตั้งค่า Environment**

### **Environment Variables:**
```bash
# สร้างไฟล์ .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### **Python Environment:**
```bash
# สร้าง virtual environment
python3 -m venv venv

# เปิดใช้งาน
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# ติดตั้ง dependencies
pip install -r requirements.txt
```

### **Node.js Environment:**
```bash
# ติดตั้ง dependencies
npm install

# เริ่มต้น development server
npm run dev
```

## 📚 **แหล่งข้อมูลเพิ่มเติม**

- [Next.js Documentation](https://nextjs.org/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/)

---

**สร้างด้วย ❤️ สำหรับระบบจำแนกประเภทคลื่นไฟฟ้าหัวใจ** 