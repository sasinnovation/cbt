import { db } from '../offline/db';

export async function saveAnswer(answer) {

  await db.answers.put({
    ...answer,
    savedAt: Date.now()
  });

  await db.syncQueue.add({
    type: 'ANSWER',
    payload: answer,
    createdAt: Date.now()
  });

}
