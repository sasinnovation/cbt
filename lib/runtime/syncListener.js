import { enterpriseSync } from '../sync/syncEngine';

export function startSyncListener(sendFn) {

  window.addEventListener('online', async () => {

    console.log('🌐 Internet restored');

    await enterpriseSync(sendFn);

  });

}
