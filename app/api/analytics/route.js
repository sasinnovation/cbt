export async function GET() {
  return Response.json({
    status: 'analytics pipeline active',
    mode: 'event-driven',
    message: 'real data ingestion ready'
  });
}
