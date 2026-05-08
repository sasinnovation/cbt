import { supabase } from '@/lib/supabase/client'

// TRACK FEATURE USAGE
export async function trackUsage(data) {
  return await supabase.from('usage_logs').insert([data])
}

// TRACK EXAM CREATION
export async function trackExamCreation(schoolId) {
  return await trackUsage({
    school_id: schoolId,
    action: 'CREATE_EXAM',
    timestamp: new Date()
  })
}
