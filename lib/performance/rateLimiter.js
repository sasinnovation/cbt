const requests = new Map()

export function rateLimit(userId) {
  const count = requests.get(userId) || 0

  if (count > 100) {
    return { allowed: false, reason: 'RATE_LIMIT_EXCEEDED' }
  }

  requests.set(userId, count + 1)

  return { allowed: true }
}
