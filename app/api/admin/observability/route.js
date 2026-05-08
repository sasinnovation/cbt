import { getSystemHealth } from '../../../../lib/observability'

export async function GET() {
  return Response.json(getSystemHealth())
}
