const jobs = []

export function saveJob(job) {
  jobs.push({
    ...job,
    status: 'STORED',
    createdAt: Date.now()
  })
}

export function getJobs() {
  return jobs
}
