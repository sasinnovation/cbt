export function streamTelemetry(data) {
  return {
    streaming: true,
    timestamp: Date.now(),
    data
  }
}
