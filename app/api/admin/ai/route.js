export async function GET() {
  return Response.json({
    atRisk: 12,
    predictedFails: 5,
    suspicious: 3
  })
}
