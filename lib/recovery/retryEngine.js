export function retryOperation(fn, retries = 3) {
  try {
    return fn()
  } catch (err) {
    if (retries > 0) {
      return retryOperation(fn, retries - 1)
    }
    return { error: 'FAILED_AFTER_RETRIES' }
  }
}
