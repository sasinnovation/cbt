import { db } from '../offline/db';

export async function persistExamTimer(examId, timeLeft) {

  await db.syncQueue.add({
    type: 'TIMER',
    examId,
    timeLeft,
    updatedAt: Date.now()
  });

  localStorage.setItem(
    cbt_timer_,
    JSON.stringify({
      timeLeft,
      updatedAt: Date.now()
    })
  );

}
