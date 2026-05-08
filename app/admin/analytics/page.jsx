'use client'

import { useEffect, useState } from 'react'
import { getSchoolResults } from '@/lib/analytics/analyticsService'
import { getSchoolId } from '@/lib/tenant/tenantContext'

export default function AnalyticsDashboard() {
  const [results, setResults] = useState([])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const schoolId = getSchoolId()
    const { data } = await getSchoolResults(schoolId)
    setResults(data || [])
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>School Analytics Dashboard</h1>

      <h3>Total Results: {results.length}</h3>

      {results.map((r) => (
        <div key={r.id} style={{ margin: 10, padding: 10, border: '1px solid #ccc' }}>
          <p>Student: {r.student_id}</p>
          <p>Score: {r.score}</p>
        </div>
      ))}
    </div>
  )
}
