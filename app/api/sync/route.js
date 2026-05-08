export async function POST(req) {

  const body = await req.json();

  console.log('📡 Sync Payload:', body);

  return Response.json({
    success: true
  });

}
