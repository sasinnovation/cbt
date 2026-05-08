import { db } from '../offline/db';

export async function logNavigation(data) {

  await db.syncQueue.add({
    type: 'NAVIGATION',
    payload: data,
    createdAt: Date.now()
  });

}
