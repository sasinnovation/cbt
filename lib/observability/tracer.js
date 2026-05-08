const traces = []

export function startTrace(id) {
  traces.push({
    id,
    start: Date.now(),
    steps: []
  })
}

export function addTraceStep(id, step) {
  const trace = traces.find(t => t.id === id)
  if (trace) {
    trace.steps.push({
      step,
      time: Date.now()
    })
  }
}

export function endTrace(id) {
  const trace = traces.find(t => t.id === id)
  if (trace) {
    trace.end = Date.now()
  }
}

export function getTraces() {
  return traces
}
