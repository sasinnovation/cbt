export function releasePipeline(version) {
  return {
    version,
    status: 'DEPLOYED',
    timestamp: Date.now()
  }
}
