export function productionOnly(fn) {
  if (process.env.NODE_ENV !== 'production') return null
  return fn()
}
