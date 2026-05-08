import { supabase } from '@/lib/supabase/client'

export async function requireAuth(req) {
  const token = req.headers.get('authorization')
  if (!token) throw new Error('Unauthorized')

  const { data } = await supabase.auth.getUser(token)
  return data?.user
}
