export function safeExecute(fn) {
  try {
    return fn()
  } catch (error) {
    return {
      success: false,
      error: error.message,
      fallback: true
    }
  }
}
