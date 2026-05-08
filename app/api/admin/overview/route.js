import { supabase } from '@/lib/supabase/client'

export async function GET(req) {

  const tenantId = req.headers.get('x-tenant-id')

  const { data: schools } = await supabase
    .from('schools')
    .select('*')
    .eq('id', tenantId)

  const { data: subs } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('school_id', tenantId)

  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('school_id', tenantId)

  return Response.json({
    schools,
    subscriptions: subs,
    payments
  })
}
