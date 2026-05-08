import { setVersion } from './version'

export function rollback(previousVersion) {
  setVersion(previousVersion)

  return {
    status: 'ROLLED_BACK',
    version: previousVersion,
    timestamp: Date.now()
  }
}
