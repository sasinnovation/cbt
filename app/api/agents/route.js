import { createAgent, getAgents } from '../../../lib/agents'

export async function GET() {
  return Response.json(getAgents())
}

export async function POST(req) {
  const body = await req.json()
  const agent = createAgent(body.name, body.phone)

  return Response.json(agent)
}
