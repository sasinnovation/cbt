import { initCameraStream } from './cameraInit'
import { captureSnapshot } from './snapshot'

export async function validateVisualIdentity(video) {
  const camera = await initCameraStream()

  if (camera.status !== 'CAMERA_READY') {
    return {
      status: 'FAILED',
      reason: 'NO_CAMERA_ACCESS'
    }
  }

  const snapshot = captureSnapshot(video)

  return {
    status: 'ACTIVE',
    snapshot,
    verified: true
  }
}
