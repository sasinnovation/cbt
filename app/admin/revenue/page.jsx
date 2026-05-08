'use client'

import { useEffect, useState } from 'react'

export default function RevenueDashboard() {

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/admin/overview')
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Revenue Dashboard</h1>

      {!data && <p>Loading...</p>}

      {data && (
        <div>
          <h3>Total Schools: {data.totalSchools}</h3>
          <h3>Active Subscriptions: {data.activeSubscriptions}</h3>
          <h3>Total Subscriptions: {data.totalSubscriptions}</h3>
        </div>
      )}
    </div>
  )
}
