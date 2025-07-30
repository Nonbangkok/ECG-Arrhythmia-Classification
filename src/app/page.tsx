'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { predictECG, plotECG, loadSampleFromCSV, saveClassification } from '@/lib/api'
import { SAMPLES, CLASS_LABELS, type ModelPrediction } from '@/types'
import ECGChart from '@/components/ECGChart'
import FloatingButton from '@/components/FloatingButton'

export default function HomePage() {
  const [selectedSample, setSelectedSample] = useState<string>('')
  const [inputData, setInputData] = useState<number[] | null>(null)
  const [ecgImage, setEcgImage] = useState<string>('')
  const [predictionResult, setPredictionResult] = useState<ModelPrediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resultMessage, setResultMessage] = useState('')
  const [showDoctorSection, setShowDoctorSection] = useState(false)
  const [selectedDoctorClass, setSelectedDoctorClass] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSampleChange = async (sampleIndex: string) => {
    if (!sampleIndex) {
      setSelectedSample('')
      setInputData(null)
      setEcgImage('')
      setPredictionResult(null)
      setResultMessage('')
      setShowDoctorSection(false)
      return
    }

    const sample = SAMPLES[parseInt(sampleIndex)]
    setSelectedSample(sampleIndex)
    setIsLoading(true)
    setResultMessage('Loading sample data...')

    try {
      const data = await loadSampleFromCSV(sample.csv, sample.row)
      setInputData(data)
      
      const image = await plotECG(data)
      setEcgImage(image)
      
      setPredictionResult(null)
      setResultMessage('')
      setShowDoctorSection(false)
    } catch (error) {
      console.error('Error loading sample:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setResultMessage(`Error loading sample data: ${errorMessage}`)
      setInputData(null)
      setEcgImage('')
      setPredictionResult(null)
      setShowDoctorSection(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.trim().split('\n')
        
        if (lines.length < 2) {
          setResultMessage('CSV file must have at least 2 rows.')
          return
        }

        const row = lines[1].split(',').map(Number)
        if (row.length !== 187 || row.some(isNaN)) {
          setResultMessage('Second row must have 187 numeric values.')
          return
        }

        setInputData(row)
        setSelectedSample('')
        
        const image = await plotECG(row)
        setEcgImage(image)
        
        setPredictionResult(null)
        setResultMessage('')
        setShowDoctorSection(false)
      } catch (error) {
        console.error('Error processing file:', error)
        setResultMessage('Error processing CSV file')
      }
    }
    reader.readAsText(file)
  }

  const handlePredict = async () => {
    if (!inputData) return

    setIsLoading(true)
    setResultMessage('Predicting...')

    try {
      const result = await predictECG(inputData)
      setPredictionResult(result)
      
      if (result.predicted && result.predicted.length > 0) {
        const pred = result.predicted[0]
        const percent = (pred.probabilities[pred.class_index] * 100).toFixed(2)
        setResultMessage(`Prediction: ${pred.label} (${percent}% confidence)`)
        setShowDoctorSection(true)
      } else {
        setResultMessage('Error: No prediction result')
      }
    } catch (error) {
      console.error('Prediction error:', error)
      setResultMessage('Error during prediction')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDoctorClassSelect = (classIndex: number) => {
    setSelectedDoctorClass(classIndex)
  }

  const handleConfirm = async () => {
    if (!inputData || !predictionResult || selectedDoctorClass === null) {
      setResultMessage('Please select a classification first.')
      return
    }

    try {
      await saveClassification({
        input_data: inputData,
        model_prediction: predictionResult,
        doctor_classification: selectedDoctorClass
      })
      
      setResultMessage('Data saved successfully!')
      setShowDoctorSection(false)
      setSelectedDoctorClass(null)
    } catch (error) {
      console.error('Save error:', error)
      setResultMessage('Error saving data')
    }
  }

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
              ECG Arrhythmia Classification Demo
            </h1>
            <p className="text-gray-600 text-lg">
              Advanced AI-powered ECG Analysis System
            </p>
          </div>

          {/* Sample Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📊</span>
              <h2 className="text-xl font-semibold text-gray-800">Select Sample Data</h2>
            </div>
            <select
              value={selectedSample}
              onChange={(e) => handleSampleChange(e.target.value)}
              className="input-field"
            >
              <option value="">Choose ECG Sample...</option>
              {SAMPLES.map((sample, index) => (
                <option key={index} value={index}>
                  {sample.label}
                </option>
              ))}
            </select>
          </motion.div>

          {/* File Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📁</span>
              <h2 className="text-xl font-semibold text-gray-800">Upload Custom Data</h2>
            </div>
            <div className="text-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary"
              >
                Choose CSV File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800 font-medium mb-2">CSV Format Example:</p>
              <pre className="text-xs bg-white p-3 rounded border">
{`0,1,2,3,4,5,...,185,186
0.12,0.15,0.18,...,0.22,0.19`}
              </pre>
              <p className="text-xs text-blue-600 mt-2">
                First row: index (can be any numbers)<br />
                Second row: 187 ECG values (float or int, separated by comma)
              </p>
            </div>
          </motion.div>

          {/* ECG Chart */}
          {inputData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <ECGChart data={inputData} title="ECG Signal" />
            </motion.div>
          )}

          {/* Predict Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <button
              onClick={handlePredict}
              disabled={!inputData || isLoading}
              className={`btn-secondary ${!inputData || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Predicting...' : 'Predict Classification'}
            </button>
          </motion.div>

          {/* Result */}
          {resultMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-center p-4 rounded-xl mb-6 ${
                resultMessage.includes('Error') 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {resultMessage}
            </motion.div>
          )}

          {/* Doctor Classification */}
          {showDoctorSection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-green-50 rounded-2xl p-6 border border-green-200"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">👨‍⚕️</span>
                <h3 className="text-xl font-semibold text-green-800">Doctor Confirmation</h3>
              </div>
              <p className="text-green-700 mb-4">
                <strong>Please select the correct class:</strong>
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {CLASS_LABELS.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => handleDoctorClassSelect(index)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedDoctorClass === index
                        ? 'border-green-500 bg-green-100 text-green-800'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={handleConfirm}
                  disabled={selectedDoctorClass === null}
                  className={`btn-primary ${selectedDoctorClass === null ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Confirm & Save
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating Buttons */}
      <FloatingButton
        position="left"
        onClick={() => window.location.href = '/dashboard'}
        className="bg-gradient-to-r from-green-600 to-green-700 text-white"
      >
        Dashboard
      </FloatingButton>
      
      <FloatingButton
        position="right"
        onClick={() => window.location.href = '/license'}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"
      >
        View License
      </FloatingButton>
    </div>
  )
} 