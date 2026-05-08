import { useState } from 'react'
import { validateVisualIdentity } from '@/lib/ai/biometric/identityPipeline'

export function useBiometricAI() {
  const [state, setState] = useState(null)

  async function verify(video) {
    const result = await validateVisualIdentity(video)
    setState(result)
    return result
  }

  return { state, verify }
}
