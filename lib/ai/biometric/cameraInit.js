export async function initCameraStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    return {
      status: 'CAMERA_READY',
      stream
    }
  } catch (err) {
    return {
      status: 'CAMERA_BLOCKED',
      error: err.message
    }
  }
}
