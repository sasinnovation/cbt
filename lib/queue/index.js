const queue = []

export function addJob(job) {
  queue.push({
    ...job,
    status: 'PENDING',
    createdAt: Date.now()
  })
}

export function processJobs() {
  return queue.map(job => ({
    ...job,
    status: 'COMPLETED'
  }))
}
