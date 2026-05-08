import { useState } from 'react'
import { evaluateStudent } from '@/lib/ai/proctor/proctorEngine'

export function useProctorAI() {
  const [state, setState] = useState(null)

  function updateProfile(profile) {
    const result = evaluateStudent(profile)
    setState(result)
    return result
  }

  return { state, updateProfile }
}
