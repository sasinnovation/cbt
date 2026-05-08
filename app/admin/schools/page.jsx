'use client'

import { useEffect, useState } from 'react'

export default function SchoolsPage() {

  const [schools, setSchools] = useState([])

  useEffect(() => {
    fetch('/api/admin/overview')
      .then(res => res.json())
      .then(data => {
        setSchools([{ name: 'Demo School', status: 'active' }])
      })
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Schools Management</h1>

      {schools.map((s, i) => (
        <div key={i}>
          <p>{s.name} - {s.status}</p>
        </div>
      ))}
    </div>
  )
}
