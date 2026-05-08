const agents = []

export function createAgent(name, phone) {
  const agent = {
    id: Date.now(),
    name,
    phone,
    code: 'AGT-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    referrals: 0,
    earnings: 0
  }

  agents.push(agent)
  return agent
}

export function getAgents() {
  return agents
}

export function findAgentByCode(code) {
  return agents.find(a => a.code === code)
}

export function addReferral(code) {
  const agent = findAgentByCode(code)
  if (agent) {
    agent.referrals += 1
    agent.earnings += 1000 // simple fixed commission tracking
  }
}
