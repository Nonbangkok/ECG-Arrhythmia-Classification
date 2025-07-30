import axios from 'axios'
import type { ModelPrediction, DashboardData, ClassificationData } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const predictECG = async (inputData: number[]): Promise<ModelPrediction> => {
  try {
    const response = await api.post('/predict', { input: inputData })
    return response.data
  } catch (error) {
    console.error('Prediction error:', error)
    throw new Error('Failed to predict ECG data')
  }
}

export const plotECG = async (inputData: number[]): Promise<string> => {
  try {
    const response = await api.post('/plot', { input: inputData })
    return response.data.image
  } catch (error) {
    console.error('Plot error:', error)
    throw new Error('Failed to generate ECG plot')
  }
}

export const getDashboardData = async (): Promise<DashboardData[]> => {
  try {
    const response = await api.get('/dashboard_data')
    return response.data
  } catch (error) {
    console.error('Dashboard data error:', error)
    throw new Error('Failed to fetch dashboard data')
  }
}

export const updateClassification = async (data: {
  timestamp: string
  input_data: number[]
  model_class: number
  doctor_class: number
}): Promise<{ success: boolean }> => {
  try {
    const response = await api.post('/dashboard_update_row', data)
    return response.data
  } catch (error) {
    console.error('Update error:', error)
    throw new Error('Failed to update classification')
  }
}

export const deleteClassification = async (data: {
  timestamp: string
  input_data: number[]
}): Promise<{ success: boolean }> => {
  try {
    const response = await api.post('/dashboard_delete_row', data)
    return response.data
  } catch (error) {
    console.error('Delete error:', error)
    throw new Error('Failed to delete classification')
  }
}

export const saveClassification = async (data: {
  input_data: number[]
  model_prediction: ModelPrediction
  doctor_classification: number
}): Promise<{ success: boolean }> => {
  try {
    const response = await api.post('/save_classification', data)
    return response.data
  } catch (error) {
    console.error('Save error:', error)
    throw new Error('Failed to save classification')
  }
}

export const loadSampleFromCSV = async (csvPath: string, rowNum: number): Promise<number[]> => {
  try {
    // ใช้ API endpoint ที่ถูกต้อง
    const response = await api.get(`/data/${csvPath}`)
    const text = response.data
    const lines = text.trim().split('\n')
    
    console.log(`CSV Debug: Total lines: ${lines.length}, Requested row: ${rowNum}`)
    console.log(`CSV Debug: First line has ${lines[0].split(',').length} values`)
    console.log(`CSV Debug: Second line has ${lines[1].split(',').length} values`)
    
    if (rowNum >= lines.length) {
      throw new Error(`Row ${rowNum} not found in CSV (total rows: ${lines.length})`)
    }
    
    // Parse the data row (rowNum + 1 because rowNum is 0-based index)
    const dataRow = lines[rowNum + 1] // ใช้ row ที่ rowNum + 1 สำหรับ data
    const values = dataRow.split(',').map((val: string) => parseFloat(val.trim()))
    
    // Filter out NaN values (empty or invalid values)
    const validValues = values.filter((val: number) => !isNaN(val))
    
    console.log(`CSV parsing: Found ${validValues.length} valid values out of ${values.length} total values`)
    
    if (validValues.length !== 187) {
      throw new Error(`Expected 187 values, got ${validValues.length} valid values (total: ${values.length})`)
    }
    
    return validValues
  } catch (error) {
    console.error('Load sample error:', error)
    throw new Error(`Failed to load sample data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
} 