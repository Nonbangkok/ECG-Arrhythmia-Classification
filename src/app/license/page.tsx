'use client'

import { motion } from 'framer-motion'
import FloatingButton from '@/components/FloatingButton'

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-blue-800 mb-4">
              ข้อตกลงในการใช้ซอฟต์แวร์
            </h1>
            <p className="text-gray-600 text-xl font-medium">
              ECG Arrhythmia Classification System
            </p>
          </div>

          {/* License Content - 2 Blocks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Thai Block */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200 shadow-lg"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-blue-800 mb-2">
                  ภาษาไทย
                </h2>
                <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-blue-900 leading-relaxed">
                  <p className="text-lg font-medium leading-8">
                    ซอฟต์แวร์นี้เป็นผลงานที่พัฒนาขึ้นโดย นายกิตติธัช ทิพย์มณฑา, นายภูธน เกษรสิทธิ์ และนายรณกร แก้วกียูร 
                    จากโรงเรียนเบญจมราชูทิศ ภายใต้การดูแลของคุณครูเอกตวัน เลิศไกร
                  </p>
                  
                  <p className="text-lg leading-8">
                    ภายใต้โครงการ การวิเคราะห์ภาวะหัวใจเต้นผิดจังหวะจากสัญญาณคลื่นไฟฟ้าหัวใจโดยใช้สถาปัตยกรรมโครงข่ายประสาทเทียมแบบผสมผสาน
                    ระหว่างคอนโวลูชันและหน่วยความจำระยะสั้นแบบยาว ซึ่งได้รับการสนับสนุนจากสำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ
                  </p>
                  
                  <p className="text-lg leading-8">
                    โดยมีวัตถุประสงค์เพื่อส่งเสริมให้นักเรียนและนักศึกษาได้เรียนรู้และฝึกทักษะในการพัฒนาซอฟต์แวร์
                  </p>
                  
                  <p className="text-lg leading-8">
                    ลิขสิทธิ์ของซอฟต์แวร์นี้จึงเป็นของผู้พัฒนา โดยผู้พัฒนาได้อนุญาตให้สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ
                    เผยแพร่ซอฟต์แวร์นี้ตาม "ต้นฉบับ" โดยไม่มีการแก้ไขดัดแปลงใด ๆ ทั้งสิ้น
                  </p>
                  
                  <p className="text-lg leading-8">
                    ให้แก่บุคคลทั่วไปเพื่อใช้สำหรับประโยชน์ส่วนบุคคลหรือประโยชน์ทางการศึกษาที่ไม่มีวัตถุประสงค์เชิงพาณิชย์ 
                    โดยไม่คิดค่าตอบแทนการใช้ซอฟต์แวร์
                  </p>
                  
                  <p className="text-lg leading-8">
                    สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติจึงไม่มีหน้าที่ในการดูแล บำรุงรักษา จัดการอบรมการใช้งาน 
                    หรือพัฒนาประสิทธิภาพซอฟต์แวร์ รวมทั้งไม่รับรองความถูกต้องหรือประสิทธิภาพการทำงานของซอฟต์แวร์ 
                    ตลอดจนไม่รับประกันความเสียหายต่าง ๆ อันเกิดจากการใช้ซอฟต์แวร์นี้ทั้งสิ้น
                  </p>
                </div>
              </div>
            </motion.div>

            {/* English Block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-200 shadow-lg"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-indigo-800 mb-2">
                  English
                </h2>
                <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-indigo-900 leading-relaxed">
                  <p className="text-lg font-medium leading-8">
                    This software is a work developed by Mr.Kittitouch Thipmontha, Mr.Putana Kesornsit and Mr.Ronnakorn Kaewkeeyoon 
                    from Benjamarachutit school under the provision of Mr.Aktawun Lertkrai
                  </p>
                  
                  <p className="text-lg leading-8">
                    under Analysis of Cardiac Arrhythmia from Electrocardiogram Signals Using Hybrid Convolutional Neural Network (CNN) 
                    and Long Short-Term Memory (LSTM) Architectures which has been supported by the National Science and Technology 
                    Development Agency (NSTDA)
                  </p>
                  
                  <p className="text-lg leading-8">
                    in order to encourage pupils and students to learn and practice their skills in developing software
                  </p>
                  
                  <p className="text-lg leading-8">
                    Therefore, the intellectual property of this software shall belong to the developer and the developer gives NSTDA 
                    permission to distribute this software as an "as is" and non-modified software
                  </p>
                  
                  <p className="text-lg leading-8">
                    for temporary and non-exclusive use without remuneration to anyone for their own purpose or academic purposes, 
                    which are not commercial purposes
                  </p>
                  
                  <p className="text-lg leading-8">
                    In this connection, NSTDA shall not be responsible to the user for taking care, maintaining, training, 
                    or developing the efficiency of this software. Moreover, NSTDA shall not be liable for any error, 
                    software efficiency, and damages in connection with or arising out of the use of the software
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12 pt-8 border-t border-gray-200"
          >
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">ข้อมูลติดต่อ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div className="space-y-2">
                  <p><strong>โรงเรียน:</strong> โรงเรียนเบญจมราชูทิศ</p>
                  <p><strong>อาจารย์ที่ปรึกษา:</strong> คุณครูเอกตวัน เลิศไกร</p>
                  <p><strong>ผู้พัฒนา:</strong> นายกิตติธัช ทิพย์มณฑา, นายภูธน เกษรสิทธิ์, นายรณกร แก้วกียูร</p>
                </div>
                <div className="space-y-2">
                  <p><strong>องค์กรสนับสนุน:</strong> สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ (NSTDA)</p>
                  <p><strong>เวอร์ชัน:</strong> 1.0.0</p>
                  <p><strong>ปี:</strong> 2025</p>
                </div>
              </div>
            </div>
            
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Button */}
      <FloatingButton
        position="left"
        onClick={() => window.location.href = '/'}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"
      >
        Back to Demo
      </FloatingButton>
    </div>
  )
} 