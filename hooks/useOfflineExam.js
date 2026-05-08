'use client';

import { useEffect, useState } from 'react';

import { fetchExamWithOfflineSupport }
from '@/lib/pipeline/examFetcher';

import { autoSaveAnswer }
from '@/lib/pipeline/answerAutosave';

import { persistExamTimer }
from '@/lib/pipeline/timerPersistence';

import { recoverTimer }
from '@/lib/pipeline/recoverTimer';

import { logNavigation }
from '@/lib/pipeline/navigationLogger';

export function useOfflineExam(examId) {

  const [exam, setExam] = useState(null);

  const [answers, setAnswers] = useState({});

  const [timeLeft, setTimeLeft] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadExam() {

      const data =
        await fetchExamWithOfflineSupport(examId);

      setExam(data);

      const recovered =
        recoverTimer(examId);

      if (recovered?.timeLeft) {

        setTimeLeft(recovered.timeLeft);

      }

      setLoading(false);

    }

    loadExam();

  }, [examId]);

  async function saveAnswer(questionId, value) {

    const updated = {
      ...answers,
      [questionId]: value
    };

    setAnswers(updated);

    await autoSaveAnswer({
      examId,
      questionId,
      value
    });

  }

  async function saveTimer(value) {

    setTimeLeft(value);

    await persistExamTimer(examId, value);

  }

  async function trackNavigation(questionIndex) {

    await logNavigation({
      examId,
      questionIndex
    });

  }

  return {
    exam,
    answers,
    timeLeft,
    loading,
    saveAnswer,
    saveTimer,
    trackNavigation
  };

}
