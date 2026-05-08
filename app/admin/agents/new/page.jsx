'use client'

import { useState } from 'react'

export default function NewAgent() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const create = async () => {
    await fetch('/api/agents', {
      method: 'POST',
      body: JSON.stringify({ name, phone }),
      headers: { 'Content-Type': 'application/json' }
    })

    alert('Agent created')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>➕ Create Agent</h1>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Phone" onChange={e => setPhone(e.target.value)} />

      <button onClick={create}>Create Agent</button>
    </div>
  )
}
