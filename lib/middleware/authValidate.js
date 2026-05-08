import { supabase } from '@/lib/supabase/client'

export async function validateUser(token) {
  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    throw new Error('Unauthorized')
  }

  return {
    id: data.user.id,
    role: data.user.user_metadata?.role,
    school_id: data.user.user_metadata?.school_id
  }
}
