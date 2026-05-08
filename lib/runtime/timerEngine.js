import { db } from '../offline/db';

export async function persistTimer(examId, timeLeft) {

  await db.syncQueue.add({
    type: 'TIMER',
    examId,
    timeLeft,
    updatedAt: Date.now()
  });

}
