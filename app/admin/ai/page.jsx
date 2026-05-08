'use client'

import { useEffect, useState } from 'react'

export default function AIDashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/admin/ai')
      .then(r => r.json())
      .then(setData)
  }, [])

  return (
    <div style={{ padding: 30 }}>
      <h1>🧠 AI Exam Intelligence</h1>

      {!data && <p>Loading AI insights...</p>}

      {data && (
        <>
          <h3>📊 At Risk Students: {data.atRisk}</h3>
          <h3>📈 Predicted Failures: {data.predictedFails}</h3>
          <h3>🚨 Suspicious Sessions: {data.suspicious}</h3>
        </>
      )}
    </div>
  )
}
