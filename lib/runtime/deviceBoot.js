import { getDeviceId, bindDeviceToUser } from '../security/deviceLock';

export function initializeDevice(studentId) {

  const deviceId = getDeviceId();

  bindDeviceToUser(studentId);

  console.log('🔒 Device Bound:', deviceId);

}
