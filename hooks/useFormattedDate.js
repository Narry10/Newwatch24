import { useState, useEffect } from 'react'

export function useFormattedDate(dateString, options = {}) {
  const [formattedDate, setFormattedDate] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && dateString) {
      try {
        const formatted = new Date(dateString).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          ...options
        })
        setFormattedDate(formatted)
      } catch (error) {
        setFormattedDate('Invalid date')
      }
    }
  }, [mounted, dateString, options])

  // Return static fallback during SSR to prevent hydration mismatch
  if (!mounted) {
    return 'Jul 29, 2024'
  }

  return formattedDate
}