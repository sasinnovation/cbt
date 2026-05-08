export function stagingOnly(fn) {
  if (process.env.NODE_ENV !== 'staging') return null
  return fn()
}
