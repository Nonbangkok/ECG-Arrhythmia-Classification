# 🚀 Development Guide

## **Quick Start**

### **Option 1: Use Start Script (Recommended)**
```bash
./start-dev.sh
```

### **Option 2: Manual Start**

#### **Terminal 1 - Flask Backend:**
```bash
cd server
python app.py
```

#### **Terminal 2 - Next.js Frontend:**
```bash
npm run dev
```

## **🔧 Troubleshooting**

### **"Error loading sample data"**

**Cause:** Flask backend ไม่ได้รัน หรือ API endpoint ไม่ถูกต้อง

**Solution:**
1. ตรวจสอบ Flask backend รันอยู่:
   ```bash
   curl http://localhost:5000/
   ```

2. ตรวจสอบ CSV files:
   ```bash
   curl http://localhost:5000/data/csv/c0.csv
   ```

3. ตรวจสอบ logs ใน browser console

### **"Model not loaded"**

**Cause:** Keras model ไม่สามารถโหลดได้

**Solution:**
1. ตรวจสอบ model file:
   ```bash
   ls -la model/
   ```

2. ตรวจสอบ Python dependencies:
   ```bash
   pip install keras tensorflow
   ```

### **"Port already in use"**

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## **📁 File Structure**

```
├── server/              # Flask Backend
│   └── app.py          # Main Flask app
├── src/                 # Next.js Frontend
│   ├── app/            # Pages
│   ├── components/     # React components
│   ├── lib/           # Utilities
│   └── types/         # TypeScript types
├── data/               # CSV files
├── model/              # Keras model
└── public/             # Static files (old version)
```

## **🔗 API Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serve static files |
| `/data/<path>` | GET | Serve CSV files |
| `/predict` | POST | ECG classification |
| `/plot` | POST | Generate ECG chart |
| `/save_classification` | POST | Save classification |
| `/dashboard_data` | GET | Get dashboard data |
| `/dashboard_update_row` | POST | Update record |
| `/dashboard_delete_row` | POST | Delete record |

## **🐛 Debug Mode**

### **Flask Debug:**
```python
# ใน server/app.py
app.run(debug=True, host='0.0.0.0', port=5000)
```

### **Next.js Debug:**
```bash
# เปิด browser developer tools
# ดู Console และ Network tabs
```

## **📊 Testing**

### **Test Flask Backend:**
```bash
# Test CSV loading
curl http://localhost:5000/data/csv/c0.csv

# Test prediction
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"input": [0.1, 0.2, ...]}'
```

### **Test Next.js Frontend:**
```bash
# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

## **🔧 Common Issues**

### **1. CORS Issues**
```python
# ใน Flask app.py
from flask_cors import CORS
CORS(app)
```

### **2. Model Loading Issues**
```python
# ตรวจสอบ model path
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../model/model.h5')
print(f"Model path: {MODEL_PATH}")
print(f"Model exists: {os.path.exists(MODEL_PATH)}")
```

### **3. CSV Loading Issues**
```python
# ตรวจสอบ CSV path
csv_path = os.path.join('../data', path)
print(f"CSV path: {csv_path}")
print(f"CSV exists: {os.path.exists(csv_path)}")
```

## **🚀 Production Deployment**

### **Build Next.js:**
```bash
npm run build
npm start
```

### **Deploy Flask:**
```bash
# ใช้ gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## **📝 Logs**

### **Flask Logs:**
```bash
# ดู Flask logs
tail -f server/app.py
```

### **Next.js Logs:**
```bash
# ดู Next.js logs
npm run dev
```

## **🎯 Performance Tips**

1. **Flask Backend:**
   - ใช้ `gunicorn` สำหรับ production
   - เปิด `debug=False` ใน production
   - ใช้ caching สำหรับ model predictions

2. **Next.js Frontend:**
   - ใช้ `npm run build` สำหรับ production
   - เปิด compression
   - ใช้ CDN สำหรับ static files

## **🔒 Security**

1. **API Security:**
   - ใช้ HTTPS ใน production
   - เปิด CORS เฉพาะ domain ที่จำเป็น
   - Validate input data

2. **Data Privacy:**
   - ไม่เก็บ personal data
   - ใช้ local storage เฉพาะที่จำเป็น
   - Clear data เมื่อ logout

---

**Happy Coding! 🚀** 