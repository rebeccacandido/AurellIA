import { appConfig, OperationResult } from './config';

const buildUrl = (path: string) => `${appConfig.apiBaseUrl}${path}`;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(buildUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof payload === 'string'
      ? payload
      : payload?.message || 'Erro ao comunicar com a API.';
    throw new Error(message);
  }

  return payload as T;
}

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type PurchaseResponse = {
  success: boolean;
  message: string;
  student_coins?: number;
  remaining_coins?: number;
  product_price?: number;
};

export type QuizAlternative = {
  id: number;
  content: string;
  is_correct?: boolean;
};

export type QuizQuestion = {
  id: number;
  content: string;
  alternatives: QuizAlternative[];
};

export type Quiz = {
  id: number;
  title: string;
  description?: string;
  discipline_id: number;
  questions: QuizQuestion[];
};

export type QuizAnswerPayload = {
  question_id: number;
  alternative_id: number;
  time_spent?: number | null;
};

export type QuizSubmissionPayload = {
  student_id: number;
  quiz_id: number;
  answers: QuizAnswerPayload[];
};

export type QuizSubmissionResponse = {
  quiz_id: number;
  student_id: number;
  correct_answers: number;
  total_questions: number;
  score_percent: number;
  coins_earned: number;
  total_coins: number;
  success_rate: string;
  message: string;
};

export type Student = {
  id: number;
  name: string;
  email?: string | null;
  coins: number;
  group_id?: number | null;
};

export type GroupNarrativeReport = OperationResult<string[]>;

export type GroupPerformanceReport = OperationResult<{
  period: {
    start: string;
    end: string;
  };
  group: {
    id: number;
    name: string;
    total_students: number;
  };
  group_metrics: {
    average_accuracy_rate: number;
    average_time_spent: number;
    hardest_question: string | null;
    easiest_question: string | null;
    best_quiz: string | null;
    worst_quiz: string | null;
  };
  quiz_metrics: Record<
    string,
    {
      quiz_id: number;
      title: string;
      accuracy_rate: number;
      average_time_spent: number;
      most_correct_questions: Record<string, number>;
      most_missed_questions: Record<string, number>;
    }
  >;
  student_ranking: Array<{
    student_id: number;
    name: string;
    accuracy_rate: number;
    total_answered: number;
    total_correct: number;
  }>;
}>;

export const api = {
  listProducts: () => request<Product[]>('/products'),
  buyProduct: (studentId: number, productId: number) =>
    request<PurchaseResponse>('/products/buy', {
      method: 'POST',
      body: JSON.stringify({ student_id: studentId, product_id: productId }),
    }),
  getQuiz: (quizId: number) => request<Quiz>(`/quizzes/${quizId}`),
  listQuestionsByDiscipline: (disciplineId: number) =>
    request<QuizQuestion[]>(`/quizzes/discipline/${disciplineId}/questions`),
  submitQuiz: (payload: QuizSubmissionPayload) =>
    request<QuizSubmissionResponse>('/quizzes/submit', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  generateQuizGroupReport: (groupId: number) =>
    request<GroupPerformanceReport>(`/quizzes/${groupId}/generate-group-report`, {
      method: 'POST',
    }),
  generateGroupNarrativeReport: (groupId: number) =>
    request<GroupNarrativeReport>(`/groups/${groupId}`, {
      method: 'POST',
    }),
  getStudent: (studentId: number) => request<Student>(`/students/${studentId}`),
};
