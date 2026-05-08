'use client'

import { useState } from 'react'

export default function Onboarding() {
  const [step, setStep] = useState(1)

  return (
    <div style={{ padding: 40 }}>
      <h1>School Onboarding</h1>

      {step === 1 && (
        <div>
          <h3>Step 1: School Info</h3>
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Step 2: Payment Setup</h3>
          <button onClick={() => setStep(3)}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Step 3: Complete Setup</h3>
          <button>Finish</button>
        </div>
      )}
    </div>
  )
}
