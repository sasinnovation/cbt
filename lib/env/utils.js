import { ENV } from './index'

export function envInfo() {
  return {
    mode: ENV.mode,
    production: ENV.isProduction,
    staging: ENV.isStaging,
    development: ENV.isDevelopment
  }
}
