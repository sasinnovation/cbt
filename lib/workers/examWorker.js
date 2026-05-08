import { processJobs } from '../queue'

export function startWorker() {
  return {
    status: 'WORKER_RUNNING',
    processed: processJobs().length
  }
}
