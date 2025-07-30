'use client'

import { motion } from 'framer-motion'

interface FloatingButtonProps {
  children: React.ReactNode
  onClick: () => void
  position: 'left' | 'right'
  className?: string
}

export default function FloatingButton({ 
  children, 
  onClick, 
  position, 
  className = '' 
}: FloatingButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`floating-btn ${position === 'left' ? 'left-8' : 'right-8'} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  )
} 