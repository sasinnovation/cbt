export async function GET() {
  return Response.json({
    status: 'OK',
    system: 'CBT SaaS',
    timestamp: Date.now()
  })
}
