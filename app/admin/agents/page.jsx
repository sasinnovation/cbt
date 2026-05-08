'use client'

import { useEffect, useState } from 'react'

export default function AgentsPage() {
  const [agents, setAgents] = useState([])

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(setAgents)
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>🤝 Referral Agents</h1>

      {agents.map(agent => (
        <div key={agent.id} style={{ border: '1px solid #ccc', padding: 10, margin: 10 }}>
          <h3>{agent.name}</h3>
          <p>📞 {agent.phone}</p>
          <p>🔑 Code: {agent.code}</p>
          <p>🏫 Referrals: {agent.referrals}</p>
          <p>💰 Earnings: ₦{agent.earnings}</p>
        </div>
      ))}
    </div>
  )
}
