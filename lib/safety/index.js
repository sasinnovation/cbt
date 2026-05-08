export function safeRun(fn, fallback = null) {
  try {
    return fn()
  } catch (err) {
    console.error('SAFE ERROR:', err)
    return fallback
  }
}
