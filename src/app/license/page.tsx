'use client'

import { motion } from 'framer-motion'
import FloatingButton from '@/components/FloatingButton'

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              License Agreement
            </h1>
            <p className="text-gray-600 text-lg">
              ECG Arrhythmia Classification System
            </p>
          </div>

          {/* License Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">MIT License</h2>
              <p className="text-blue-700 mb-4">
                Copyright (c) 2024 ECG Arrhythmia Classification System
              </p>
              <p className="text-blue-700">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Terms of Use</h3>
              <ul className="text-green-700 space-y-2">
                <li>• This system is for educational and research purposes only</li>
                <li>• Medical decisions should not be based solely on AI predictions</li>
                <li>• Always consult with qualified healthcare professionals</li>
                <li>• The system is provided "as is" without warranty</li>
                <li>• Users are responsible for their own medical decisions</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4">Disclaimer</h3>
              <p className="text-yellow-700">
                This ECG classification system is designed for educational and research purposes. 
                It should not be used as a substitute for professional medical advice, diagnosis, 
                or treatment. Always seek the advice of qualified healthcare providers with questions 
                you may have regarding medical conditions.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Privacy Policy</h3>
              <p className="text-purple-700">
                This system processes ECG data for classification purposes. All data is processed 
                locally and no personal information is stored or transmitted. The system does not 
                collect, store, or share any personal medical information.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
              <p className="text-gray-700">
                For questions about this license or the ECG classification system, please contact:
              </p>
              <div className="mt-4 space-y-2 text-gray-700">
                <p><strong>Email:</strong> support@ecg-classification.com</p>
                <p><strong>Website:</strong> https://ecg-classification.com</p>
                <p><strong>Version:</strong> 1.0.0</p>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-gray-600">
              © 2024 ECG Arrhythmia Classification System. All rights reserved.
            </p>
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