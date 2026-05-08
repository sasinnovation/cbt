import { envInfo } from '../../../lib/env/utils'

export default function EnvironmentDashboard() {
  const env = envInfo()

  return (
    <div style={{ padding: 40 }}>
      <h1>🌍 Environment Control Center</h1>

      <p>Mode: {env.mode}</p>
      <p>Production: {String(env.production)}</p>
      <p>Staging: {String(env.staging)}</p>
      <p>Development: {String(env.development)}</p>
    </div>
  )
}
