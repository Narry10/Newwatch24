'use client'

import dynamic from 'next/dynamic'

const AnalyticsTracker = dynamic(() => import('./AnalyticsTracker'), { 
  ssr: false,
  loading: () => null
})

export default function ClientAnalyticsTracker() {
  return <AnalyticsTracker />
}