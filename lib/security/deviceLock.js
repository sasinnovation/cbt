import { v4 as uuidv4 } from 'uuid';

export function getDeviceId() {
  let id = localStorage.getItem('device_id');

  if (!id) {
    id = uuidv4();
    localStorage.setItem('device_id', id);
  }

  return id;
}

export function bindDeviceToUser(userId) {
  localStorage.setItem('bound_user', userId);
}
