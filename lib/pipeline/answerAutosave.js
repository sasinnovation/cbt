import { db } from '../offline/db';

export async function autoSaveAnswer(answer) {

  await db.answers.put({
    ...answer,
    updatedAt: Date.now()
  });

  await db.syncQueue.add({
    type: 'ANSWER',
    payload: answer,
    createdAt: Date.now()
  });

  console.log('✅ Answer saved offline');

}
