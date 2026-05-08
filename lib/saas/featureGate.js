import { getSubscription } from '@/lib/billing/subscriptionService'

// FEATURE LIMITS PER PLAN
const PLAN_LIMITS = {
  free: { exams: 2, students: 50 },
  basic: { exams: 10, students: 200 },
  pro: { exams: 999, students: 9999 }
}

// CHECK IF FEATURE IS ALLOWED
export async function canUseFeature(schoolId, feature) {
  const { data } = await getSubscription(schoolId)

  const plan = data?.plan || 'free'
  const limits = PLAN_LIMITS[plan]

  return limits ? true : false
}
