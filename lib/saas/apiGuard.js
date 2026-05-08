import { getSubscription } from '@/lib/billing/subscriptionService'

// BASIC API GUARD
export async function apiGuard(schoolId) {
  const sub = await getSubscription(schoolId)

  if (!sub?.data || sub.data.status !== 'active') {
    throw new Error('Subscription inactive')
  }

  return true
}
