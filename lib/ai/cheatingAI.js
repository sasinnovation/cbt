import { db } from '../offline/db';

let tabSwitchCount = 0;

export function startAIMonitor() {
  document.addEventListener('visibilitychange', async () => {
    if (document.hidden) {
      tabSwitchCount++;

      await db.cheatLogs.add({
        type: 'TAB_SWITCH',
        count: tabSwitchCount,
        time: Date.now()
      });
    }
  });

  window.addEventListener('blur', async () => {
    await db.cheatLogs.add({
      type: 'WINDOW_BLUR',
      time: Date.now()
    });
  });
}
