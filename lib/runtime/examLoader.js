import { db } from '../offline/db';
import { encryptExam, decryptExam } from '../security/encryption';

export async function saveExamOffline(exam) {
  const encrypted = encryptExam(exam);

  await db.exams.put({
    id: exam.id,
    payload: encrypted
  });
}

export async function loadExamOffline(examId) {
  const localExam = await db.exams.get(examId);

  if (!localExam) return null;

  return decryptExam(localExam.payload);
}
