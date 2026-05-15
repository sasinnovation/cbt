export function getExams() { return [] }; 

export function createExam(data: {
  id: string;
  title: string;
  class: string;
  duration: number;
  questions: any[];
  createdAt: string;
}) { 
  return data;
}

