export function deploymentCheck(status) {
  if (!status.buildSuccess) {
    return {
      deploy: false,
      reason: 'BUILD_FAILED'
    }
  }

  return {
    deploy: true,
    status: 'SAFE_TO_DEPLOY'
  }
}
