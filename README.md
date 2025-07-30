# 🫀 ระบบจำแนกประเภทภาวะหัวใจเต้นผิดจังหวะจากคลื่นไฟฟ้าหัวใจ (ECG)

## 🚀 **เว็บแอปพลิเคชันสมัยใหม่ด้วย Next.js**

ระบบจำแนกประเภทภาวะหัวใจเต้นผิดจังหวะจากคลื่นไฟฟ้าหัวใจที่พัฒนาด้วยเทคโนโลยีสมัยใหม่ Next.js 14, TypeScript, Tailwind CSS และ Framer Motion

## ✨ **คุณสมบัติหลัก**

### **เทคโนโลยีที่ใช้:**
- **Next.js 14** - React framework พร้อม App Router
- **TypeScript** - ความปลอดภัยของข้อมูลและประสบการณ์การพัฒนา
- **Tailwind CSS** - CSS framework แบบ utility-first
- **Framer Motion** - แอนิเมชันและ transition ที่นุ่มนวล
- **Chart.js** - การแสดงผลข้อมูลที่สวยงาม
- **React Hook Form** - การจัดการฟอร์มและ validation

### **การออกแบบ UI/UX:**
- 🎨 **การออกแบบสมัยใหม่** - ธีมสีขาว/ฟ้า/น้ำเงินที่สะอาดตา
- 📱 **รองรับทุกอุปกรณ์** - ใช้งานได้ดีทั้งมือถือและคอมพิวเตอร์
- ✨ **แอนิเมชันที่นุ่มนวล** - ใช้ Framer Motion
- 🎯 **กราฟแบบโต้ตอบ** - แสดงคลื่นไฟฟ้าหัวใจแบบ real-time
- 🔍 **ระบบกรองขั้นสูง** - ค้นหา กรอง และเรียงลำดับข้อมูล
- 📊 **แดชบอร์ดวิเคราะห์** - กราฟเปรียบเทียบการจำแนกประเภท

### **ฟังก์ชันหลัก:**
- 📈 **การวิเคราะห์คลื่นไฟฟ้าหัวใจ** - จำแนกประเภทด้วย AI
- 👨‍⚕️ **การยืนยันจากแพทย์** - การตรวจสอบโดยผู้เชี่ยวชาญ
- 💾 **การจัดการข้อมูล** - บันทึก แก้ไข และลบการจำแนกประเภท
- 📋 **ข้อมูลตัวอย่าง** - ตัวอย่างคลื่นไฟฟ้าหัวใจสำหรับทดสอบ
- 📁 **อัปโหลดไฟล์** - รองรับไฟล์ CSV กำหนดเอง

## 🛠️ **การติดตั้ง**

### **ข้อกำหนด:**
- Node.js 18+ 
- npm หรือ yarn
- Python 3.8+ (สำหรับ Flask backend)
- Git

### **การติดตั้ง:**

#### **Windows:**
```cmd
# ติดตั้ง dependencies
npm install

# เริ่มต้นเซิร์ฟเวอร์พัฒนา
npm run dev

# สร้างสำหรับ production
npm run build

# เริ่มต้นเซิร์ฟเวอร์ production
npm start
```

#### **macOS/Linux:**
```bash
# ติดตั้ง dependencies
npm install

# เริ่มต้นเซิร์ฟเวอร์พัฒนา
npm run dev

# สร้างสำหรับ production
npm run build

# เริ่มต้นเซิร์ฟเวอร์ production
npm start
```

## 📁 **โครงสร้างโปรเจกต์**

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
│   ├── components/        # React components
│   ├── lib/               # utilities
│   └── types/             # TypeScript types
├── scripts/                # Scripts สำหรับ platform ต่างๆ
├── requirements.txt        # Python dependencies
├── package.json           # Node.js dependencies
└── README.md              # คู่มือการใช้งาน
```

## 🎯 **หน้าหลัก**

### **1. หน้าหลัก (`/`)**
- เลือกข้อมูลตัวอย่าง
- อัปโหลดไฟล์ CSV
- แสดงคลื่นไฟฟ้าหัวใจแบบ real-time
- ระบบทำนายด้วย AI
- ระบบยืนยันจากแพทย์

### **2. แดชบอร์ด (`/dashboard`)**
- กราฟเปรียบเทียบการจำแนกประเภท
- ระบบกรองขั้นสูง
- ตารางข้อมูลพร้อมแก้ไข inline
- แสดงคลื่นไฟฟ้าหัวใจ
- ส่งออกข้อมูล

### **3. หน้าใบอนุญาต (`/license`)**
- ข้อมูล MIT License
- เงื่อนไขการใช้งาน
- นโยบายความเป็นส่วนตัว
- ข้อมูลติดต่อ

## 🔧 **การเชื่อมต่อ API**

Frontend Next.js เชื่อมต่อกับ Python Flask backend:

```typescript
// API endpoints
POST /predict          # จำแนกประเภทคลื่นไฟฟ้าหัวใจ
POST /plot            # สร้างกราฟคลื่นไฟฟ้าหัวใจ
GET  /dashboard_data  # ดึงข้อมูลการจำแนกประเภท
POST /save_classification    # บันทึกการจำแนกประเภทใหม่
POST /dashboard_update_row   # อัปเดตข้อมูลที่มีอยู่
POST /dashboard_delete_row   # ลบข้อมูล
```

## 🎨 **ระบบการออกแบบ**

### **ชุดสี:**
- **สีฟ้าหลัก:** `#0ea5e9` (Blue-500)
- **สีเขียวรอง:** `#22c55e` (Green-500)
- **สีแดงเน้น:** `#ef4444` (Red-500)
- **สีเทา:** `#64748b` (Slate-500)

### **ตัวอักษร:**
- **ฟอนต์:** Inter (Google Fonts)
- **หัวข้อ:** ตัวหนา พร้อม gradient
- **เนื้อหา:** สะอาด อ่านง่าย

### **คอมโพเนนต์:**
- **การ์ด:** มุมโค้ง เงา เอฟเฟกต์ hover
- **ปุ่ม:** พื้นหลัง gradient การเปลี่ยนผ่านที่นุ่มนวล
- **กราฟ:** แบบโต้ตอบ responsive แอนิเมชัน
- **ฟอร์ม:** input สะอาด feedback validation

## 🚀 **คุณสมบัติประสิทธิภาพ**

- **Server-Side Rendering (SSR)** - โหลดหน้าเว็บเร็ว
- **Static Site Generation (SSG)** - ประสิทธิภาพที่เหมาะสม
- **Code Splitting** - โหลดเฉพาะโค้ดที่จำเป็น
- **Image Optimization** - ปรับแต่งรูปภาพอัตโนมัติ
- **TypeScript** - ตรวจสอบข้อผิดพลาดตอน compile

## 📱 **การออกแบบที่ตอบสนอง**

- **Mobile First** - เหมาะสมสำหรับมือถือ
- **Tablet Friendly** - เลย์เอาต์ที่ปรับตัวได้
- **Desktop Enhanced** - ฟีเจอร์ครบถ้วน
- **Touch Optimized** - ปฏิสัมพันธ์ที่เหมาะสำหรับการสัมผัส

## 🔒 **ความปลอดภัย**

- **Type Safety** - TypeScript ป้องกันข้อผิดพลาด runtime
- **Input Validation** - การตรวจสอบและทำความสะอาดข้อมูล
- **API Security** - การสื่อสาร API ที่ปลอดภัย
- **Privacy Focused** - ไม่เก็บข้อมูลส่วนบุคคล

## 🚀 **การ Deploy**

### **Vercel (แนะนำ):**
```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **แพลตฟอร์มอื่นๆ:**
- **Netlify:** `npm run build && netlify deploy`
- **AWS:** ใช้ AWS Amplify หรือ S3 + CloudFront
- **Docker:** สร้าง Dockerfile สำหรับ containerization

## 📊 **การวิเคราะห์และติดตาม**

- **Performance Monitoring** - การวิเคราะห์ประสิทธิภาพของ Next.js
- **Error Tracking** - รายงานข้อผิดพลาดอัตโนมัติ
- **User Analytics** - ติดตามการใช้งาน
- **SEO Optimization** - Meta tags และ structured data

## 🤝 **การมีส่วนร่วม**

1. Fork repository
2. สร้าง feature branch
3. ทำการเปลี่ยนแปลง
4. เพิ่มเทสต์ (ถ้ามี)
5. ส่ง pull request

## 📄 **ใบอนุญาต**

โปรเจกต์นี้ได้รับอนุญาตภายใต้ MIT License - ดูรายละเอียดในไฟล์ [LICENSE](LICENSE)

## 🆚 **การเปรียบเทียบกับเวอร์ชันเดิม**

| คุณสมบัติ | เวอร์ชันเดิม (Flask) | เวอร์ชัน Next.js |
|---------|------------------|-----------------|
| **Framework** | Flask + HTML/CSS/JS | Next.js + React |
| **Type Safety** | ❌ | ✅ TypeScript |
| **แอนิเมชัน** | CSS พื้นฐาน | ✅ Framer Motion |
| **การตอบสนอง** | พื้นฐาน | ✅ Mobile-first |
| **ประสิทธิภาพ** | ดี | ✅ ปรับแต่งแล้ว |
| **ประสบการณ์นักพัฒนา** | พื้นฐาน | ✅ ยอดเยี่ยม |
| **การ Deploy** | ใช้มือ | ✅ One-click |

## 🎉 **เริ่มต้นใช้งาน**

1. **Clone repository**
2. **ติดตั้ง dependencies:** `npm install`
3. **เริ่มต้น Flask backend:** `python server/app.py`
4. **เริ่มต้น Next.js dev server:** `npm run dev`
5. **เปิดเบราว์เซอร์:** `http://localhost:3000`

---

**สร้างด้วย ❤️ โดยใช้ Next.js, TypeScript และ Tailwind CSS**
