import { supabase } from '@/lib/supabase/client'

// CREATE SCHOOL SUBSCRIPTION
export async function createSubscription(schoolId, plan) {
  return await supabase.from('subscriptions').insert([
    {
      school_id: schoolId,
      plan,
      status: 'active'
    }
  ])
}

// CHECK SUBSCRIPTION STATUS
export async function getSubscription(schoolId) {
  return await supabase
    .from('subscriptions')
    .select('*')
    .eq('school_id', schoolId)
    .single()
}

// CANCEL SUBSCRIPTION
export async function cancelSubscription(id) {
  return await supabase
    .from('subscriptions')
    .update({ status: 'cancelled' })
    .eq('id', id)
}
