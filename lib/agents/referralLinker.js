import { addReferral } from '../agents'

export function attachReferralToSchool(refCode) {
  if (refCode) {
    addReferral(refCode)
  }
}
