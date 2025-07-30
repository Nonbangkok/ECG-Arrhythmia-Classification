export interface ECGSample {
  label: string
  csv: string
  row: number
}

export interface PredictionResult {
  class_index: number
  label: string
  probabilities: number[]
}

export interface ModelPrediction {
  result: number[][]
  predicted: PredictionResult[]
}

export interface DashboardData {
  timestamp: string
  model_class: number
  doctor_class: number
  input_data: number[]
}

export interface ClassificationData {
  timestamp: string
  input_data: number[]
  model_class: number
  model_label: string
  model_probabilities: number[]
  doctor_class: number
  doctor_label: string
}

export interface FilterOptions {
  class?: string
  search?: string
  date?: string
}

export type ClassLabel = 
  | 'Class 0: Normal'
  | 'Class 1: Supraventricular Premature Beat'
  | 'Class 2: Premature Ventricular Contraction'
  | 'Class 3: Unclassifiable Beat'

export const CLASS_LABELS: ClassLabel[] = [
  'Class 0: Normal',
  'Class 1: Supraventricular Premature Beat',
  'Class 2: Premature Ventricular Contraction',
  'Class 3: Unclassifiable Beat'
]

export const SAMPLES: ECGSample[] = [
  { label: 'Class 0 - Sample 1', csv: 'csv/c0.csv', row: 0 },
  { label: 'Class 0 - Sample 2', csv: 'csv/c0.csv', row: 1 },
  { label: 'Class 0 - Sample 3', csv: 'csv/c0.csv', row: 2 },
  { label: 'Class 1 - Sample 1', csv: 'csv/c1.csv', row: 0 },
  { label: 'Class 1 - Sample 2', csv: 'csv/c1.csv', row: 1 },
  { label: 'Class 1 - Sample 3', csv: 'csv/c1.csv', row: 2 },
  { label: 'Class 2 - Sample 1', csv: 'csv/c2.csv', row: 0 },
  { label: 'Class 2 - Sample 2', csv: 'csv/c2.csv', row: 1 },
  { label: 'Class 2 - Sample 3', csv: 'csv/c2.csv', row: 2 },
  { label: 'Class 3 - Sample 1', csv: 'csv/c3.csv', row: 0 },
  { label: 'Class 3 - Sample 2', csv: 'csv/c3.csv', row: 1 },
  { label: 'Class 3 - Sample 3', csv: 'csv/c3.csv', row: 2 },
  { label: 'Mismatch - Class 0', csv: 'mismatch/c0.csv', row: 0 },
  { label: 'Mismatch - Class 1', csv: 'mismatch/c1.csv', row: 0 },
  { label: 'Mismatch - Class 2', csv: 'mismatch/c2.csv', row: 0 },
  { label: 'Mismatch - Class 3', csv: 'mismatch/c3.csv', row: 0 },
] 