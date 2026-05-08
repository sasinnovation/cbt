import { db } from '../offline/db';

export async function enterpriseSync(sendFn) {
  const queue = await db.syncQueue.toArray();

  for (const item of queue) {
    await sendFn({
      ...item,
      timestamp: Date.now(),
      tenant: localStorage.getItem('tenant_id')
    });
  }

  await db.syncQueue.clear();
}
