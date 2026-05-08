export function generateFingerprint(req) {
  return {
    ip: req.ip || 'unknown',
    userAgent: req.headers['user-agent'],
    timestamp: Date.now()
  }
}
