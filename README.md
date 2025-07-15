# ECG Arrhythmia Classification

## วิธีติดตั้งและใช้งาน Web Application

### 1. เตรียมสภาพแวดล้อม
- แนะนำให้ใช้ Python 3.8 ขึ้นไป (แนะนำ Python 3.10 หรือ Python 3.12)
- แนะนำให้สร้าง virtual environment ก่อนติดตั้ง dependencies

```bash
python3 -m venv venv
source venv/bin/activate  # สำหรับ macOS/Linux
venv\Scripts\activate   # สำหรับ Windows
```

### 2. ติดตั้ง Dependencies
ติดตั้งไลบรารีที่จำเป็นทั้งหมดด้วยคำสั่ง:

```bash
pip install -r requirements.txt
```

### 3. ตรวจสอบไฟล์โมเดล
- ต้องมีไฟล์โมเดล `model/model.h5` อยู่ในโฟลเดอร์ `model/`
- หากไม่มีไฟล์เหล่านี้ จะไม่สามารถใช้งานระบบทำนายได้

### 4. รันเซิร์ฟเวอร์
เข้าไปที่โฟลเดอร์ `server/` แล้วรัน:

```bash
cd server
python app.py
```

- เซิร์ฟเวอร์จะรันที่ `http://127.0.0.1:5000/` (หรือ `localhost:5000`)

### 5. การใช้งานหน้าเว็บ
1. เปิดเว็บเบราว์เซอร์แล้วเข้าไปที่ [http://localhost:5000/](http://localhost:5000/)
2. เลือกตัวอย่างสัญญาณ ECG (Sample) จากเมนู หรืออัปโหลดไฟล์ CSV ของคุณเอง
3. กดปุ่ม "Predict" เพื่อให้ระบบทำนายประเภทของคลื่นหัวใจ
4. ระบบจะแสดงผลลัพธ์การทำนายและความน่าจะเป็น

#### ตัวอย่างไฟล์ CSV ที่ใช้
- ไฟล์ CSV ต้องมี 2 แถว:
    - แถวแรก: index (ตัวเลขอะไรก็ได้)
    - แถวที่สอง: ค่าคลื่น ECG จำนวน 187 ค่า (float หรือ int, คั่นด้วย comma)

ตัวอย่าง:
```
0,1,2,3,...,185,186
0.12,0.15,0.18,...,0.22,0.19
```

- สามารถดูตัวอย่างไฟล์ได้ที่ `sample.csv`

#### หมายเหตุ
- หากอัปโหลดไฟล์ CSV แล้วปุ่ม Predict ไม่ทำงาน ให้ตรวจสอบว่าแถวที่สองมีตัวเลขครบ 187 ค่า
- หากไม่มีไฟล์โมเดลหรือ dependencies ไม่ครบ จะไม่สามารถใช้งานระบบได้
- หากต้องการเปลี่ยนโมเดล ให้แทนที่ไฟล์ในโฟลเดอร์ `model/`

### 6. โครงสร้างโปรเจกต์โดยสังเขป
```
ECG-Arrhythmia-Classification/
├── data/                # ตัวอย่างข้อมูล ECG (csv)
├── model/               # โมเดลและไฟล์โครงสร้างโมเดล
├── public/              # ไฟล์หน้าเว็บ (HTML, JS, CSS)
├── server/              # โค้ดฝั่ง backend (Flask)
├── requirements.txt     # รายการ dependencies
├── sample.csv           # ตัวอย่างไฟล์ CSV
└── README.md            # คู่มือการใช้งาน
```

### 7. ปัญหาที่พบบ่อย
- **ImportError / ModuleNotFoundError**: ให้ตรวจสอบว่าได้ติดตั้ง dependencies ตาม `requirements.txt` แล้ว
- **Model not found**: ตรวจสอบว่าไฟล์ `model.h5` อยู่ในโฟลเดอร์ `model/`
- **CSV format error**: ตรวจสอบว่าไฟล์ CSV มี 2 แถว และแถวที่สองมี 187 ค่า
