'use client'

import { useEffect, useState } from 'react'

export default function ObservabilityDashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/admin/observability')
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>📊 System Observability Center</h1>

      {!data && <p>Loading system telemetry...</p>}

      {data && (
        <>
          <h3>🪵 Logs: {data.logs.length}</h3>
          <h3>📈 Requests: {data.metrics.requests}</h3>
          <h3>❌ Errors: {data.metrics.errors}</h3>
          <h3>⏱ Avg Response: {data.metrics.avgResponseTime}</h3>
          <h3>🧭 Traces: {data.traces.length}</h3>
        </>
      )}
    </div>
  )
}
