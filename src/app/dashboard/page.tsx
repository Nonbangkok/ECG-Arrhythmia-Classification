'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getDashboardData, updateClassification, deleteClassification } from '@/lib/api'
import { CLASS_LABELS, type DashboardData, type FilterOptions } from '@/types'
import DashboardChart from '@/components/DashboardChart'
import ECGChart from '@/components/ECGChart'
import FloatingButton from '@/components/FloatingButton'

export default function DashboardPage() {
  const [allData, setAllData] = useState<DashboardData[]>([])
  const [filteredData, setFilteredData] = useState<DashboardData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [filters, setFilters] = useState<FilterOptions>({})
  const [editingRow, setEditingRow] = useState<number | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterData()
  }, [allData, filters])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data = await getDashboardData()
      setAllData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterData = () => {
    let filtered = [...allData]

    if (filters.class && filters.class !== 'all') {
      const classIndex = parseInt(filters.class)
      filtered = filtered.filter(item => 
        item.model_class === classIndex || item.doctor_class === classIndex
      )
    }

    if (filters.search) {
      filtered = filtered.filter(item =>
        item.timestamp.toLowerCase().includes(filters.search!.toLowerCase())
      )
    }

    if (filters.date) {
      filtered = filtered.filter(item =>
        item.timestamp.startsWith(filters.date!)
      )
    }

    setFilteredData(filtered)
  }

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  const toggleGraphRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index)
  }

  const handleEdit = (index: number) => {
    setEditingRow(index)
  }

  const handleDelete = async (index: number) => {
    const rowData = filteredData[index]
    if (!confirm('Are you sure you want to delete this record?')) return

    try {
      await deleteClassification({
        timestamp: rowData.timestamp,
        input_data: rowData.input_data
      })
      await fetchData()
    } catch (error) {
      console.error('Error deleting record:', error)
      alert('Error deleting record')
    }
  }

  const handleUpdate = async (index: number, newModelClass: number, newDoctorClass: number) => {
    const rowData = filteredData[index]
    
    try {
      await updateClassification({
        timestamp: rowData.timestamp,
        input_data: rowData.input_data,
        model_class: newModelClass,
        doctor_class: newDoctorClass
      })
      await fetchData()
      setEditingRow(null)
    } catch (error) {
      console.error('Error updating record:', error)
      alert('Error updating record')
    }
  }

  const getModelCounts = () => {
    const counts = [0, 0, 0, 0]
    filteredData.forEach(item => {
      counts[item.model_class]++
    })
    return counts
  }

  const getDoctorCounts = () => {
    const counts = [0, 0, 0, 0]
    filteredData.forEach(item => {
      counts[item.doctor_class]++
    })
    return counts
  }

  const modelCounts = getModelCounts()
  const doctorCounts = getDoctorCounts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              ECG Classification Analytics & Management
            </p>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DashboardChart
              data={modelCounts}
              labels={CLASS_LABELS}
              title="Model Predictions"
              backgroundColor={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
            />
            <DashboardChart
              data={doctorCounts}
              labels={CLASS_LABELS}
              title="Doctor Confirmations"
              backgroundColor={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
            />
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <select
                  value={filters.class || 'all'}
                  onChange={(e) => handleFilterChange('class', e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Classes</option>
                  {CLASS_LABELS.map((label, index) => (
                    <option key={index} value={index}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search timestamp..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={filters.date || ''}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="btn-primary w-full"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>

          {/* Data Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Classification Records</h3>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading data...</p>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No records found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Timestamp</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Model Prediction</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Doctor Classification</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, index) => (
                      <>
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {row.timestamp}
                          </td>
                          <td className="py-3 px-4">
                            {editingRow === index ? (
                              <select
                                value={row.model_class}
                                onChange={(e) => {
                                  const newData = [...filteredData]
                                  newData[index].model_class = parseInt(e.target.value)
                                  setFilteredData(newData)
                                }}
                                className="input-field text-sm"
                              >
                                {CLASS_LABELS.map((label, i) => (
                                  <option key={i} value={i}>{label}</option>
                                ))}
                              </select>
                            ) : (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                row.model_class === 0 ? 'bg-blue-100 text-blue-800' :
                                row.model_class === 1 ? 'bg-green-100 text-green-800' :
                                row.model_class === 2 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {CLASS_LABELS[row.model_class]}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {editingRow === index ? (
                              <select
                                value={row.doctor_class}
                                onChange={(e) => {
                                  const newData = [...filteredData]
                                  newData[index].doctor_class = parseInt(e.target.value)
                                  setFilteredData(newData)
                                }}
                                className="input-field text-sm"
                              >
                                {CLASS_LABELS.map((label, i) => (
                                  <option key={i} value={i}>{label}</option>
                                ))}
                              </select>
                            ) : (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                row.doctor_class === 0 ? 'bg-blue-100 text-blue-800' :
                                row.doctor_class === 1 ? 'bg-green-100 text-green-800' :
                                row.doctor_class === 2 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {CLASS_LABELS[row.doctor_class]}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => toggleGraphRow(index)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition-colors"
                              >
                                {expandedRow === index ? 'Hide' : 'Graph'}
                              </button>
                              {editingRow === index ? (
                                <>
                                  <button
                                    onClick={() => handleUpdate(index, row.model_class, row.doctor_class)}
                                    className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 transition-colors"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingRow(null)}
                                    className="px-3 py-1 bg-gray-500 text-white rounded-lg text-xs hover:bg-gray-600 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleEdit(index)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-xs hover:bg-yellow-600 transition-colors"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(index)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition-colors"
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                        {expandedRow === index && (
                          <tr>
                            <td colSpan={4} className="p-4">
                              <ECGChart data={row.input_data} title="ECG Signal" />
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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