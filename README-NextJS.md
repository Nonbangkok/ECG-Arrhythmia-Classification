# ECG Arrhythmia Classification System - Next.js Version

## 🚀 **Modern React Application with Next.js**

This is the modernized version of the ECG Arrhythmia Classification System, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ **Features**

### **Modern Tech Stack:**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Chart.js** - Beautiful data visualizations
- **React Hook Form** - Form handling and validation

### **Enhanced UI/UX:**
- 🎨 **Modern Design** - Clean, professional white/blue/navy theme
- 📱 **Responsive Design** - Works perfectly on all devices
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 🎯 **Interactive Charts** - Real-time ECG signal visualization
- 🔍 **Advanced Filtering** - Search, filter, and sort data
- 📊 **Dashboard Analytics** - Model vs Doctor classification charts

### **Core Functionality:**
- 📈 **ECG Analysis** - AI-powered arrhythmia classification
- 👨‍⚕️ **Doctor Confirmation** - Medical professional validation
- 💾 **Data Management** - Save, edit, and delete classifications
- 📋 **Sample Data** - Pre-loaded ECG samples for testing
- 📁 **File Upload** - Custom CSV file support

## 🛠️ **Installation**

### **Prerequisites:**
- Node.js 18+ 
- npm or yarn
- Python Flask backend (from original project)

### **Setup:**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── dashboard/         # Dashboard pages
│   └── license/           # License page
├── components/            # React components
│   ├── ECGChart.tsx      # ECG signal chart
│   ├── DashboardChart.tsx # Analytics charts
│   └── FloatingButton.tsx # Floating action buttons
├── lib/                   # Utilities
│   └── api.ts            # API client functions
└── types/                # TypeScript definitions
    └── index.ts          # Type definitions
```

## 🎯 **Key Components**

### **1. Home Page (`/`)**
- Sample data selection
- File upload functionality
- Real-time ECG visualization
- AI prediction interface
- Doctor confirmation system

### **2. Dashboard (`/dashboard`)**
- Model vs Doctor classification charts
- Advanced filtering system
- Data table with inline editing
- ECG signal preview
- Export functionality

### **3. License Page (`/license`)**
- MIT License information
- Terms of use
- Privacy policy
- Contact information

## 🔧 **API Integration**

The Next.js frontend communicates with the Python Flask backend:

```typescript
// API endpoints
POST /predict          # ECG classification
POST /plot            # Generate ECG chart
GET  /dashboard_data  # Fetch classification data
POST /save_classification    # Save new classification
POST /dashboard_update_row   # Update existing record
POST /dashboard_delete_row   # Delete record
```

## 🎨 **Design System**

### **Color Palette:**
- **Primary Blue:** `#0ea5e9` (Blue-500)
- **Secondary Green:** `#22c55e` (Green-500)
- **Accent Red:** `#ef4444` (Red-500)
- **Neutral Gray:** `#64748b` (Slate-500)

### **Typography:**
- **Font:** Inter (Google Fonts)
- **Headings:** Bold, gradient text
- **Body:** Clean, readable text

### **Components:**
- **Cards:** Rounded corners, shadows, hover effects
- **Buttons:** Gradient backgrounds, smooth transitions
- **Charts:** Interactive, responsive, animated
- **Forms:** Clean inputs, validation feedback

## 🚀 **Performance Features**

- **Server-Side Rendering (SSR)** - Fast initial page loads
- **Static Site Generation (SSG)** - Optimized performance
- **Code Splitting** - Load only necessary code
- **Image Optimization** - Automatic image optimization
- **TypeScript** - Compile-time error checking

## 📱 **Responsive Design**

- **Mobile First** - Optimized for mobile devices
- **Tablet Friendly** - Adaptive layouts
- **Desktop Enhanced** - Full feature set
- **Touch Optimized** - Touch-friendly interactions

## 🔒 **Security**

- **Type Safety** - TypeScript prevents runtime errors
- **Input Validation** - Form validation and sanitization
- **API Security** - Secure API communication
- **Privacy Focused** - No personal data collection

## 🚀 **Deployment**

### **Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Other Platforms:**
- **Netlify:** `npm run build && netlify deploy`
- **AWS:** Use AWS Amplify or S3 + CloudFront
- **Docker:** Create Dockerfile for containerization

## 📊 **Analytics & Monitoring**

- **Performance Monitoring** - Built-in Next.js analytics
- **Error Tracking** - Automatic error reporting
- **User Analytics** - Track user interactions
- **SEO Optimization** - Meta tags and structured data

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆚 **Comparison with Original**

| Feature | Original (Flask) | Next.js Version |
|---------|------------------|-----------------|
| **Framework** | Flask + HTML/CSS/JS | Next.js + React |
| **Type Safety** | ❌ | ✅ TypeScript |
| **Animations** | Basic CSS | ✅ Framer Motion |
| **Responsive** | Basic | ✅ Mobile-first |
| **Performance** | Good | ✅ Optimized |
| **Developer Experience** | Basic | ✅ Excellent |
| **Deployment** | Manual | ✅ One-click |

## 🎉 **Getting Started**

1. **Clone the repository**
2. **Install dependencies:** `npm install`
3. **Start the Flask backend:** `python server/app.py`
4. **Start Next.js dev server:** `npm run dev`
5. **Open browser:** `http://localhost:3000`

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS** 