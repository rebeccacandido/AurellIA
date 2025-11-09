import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api, Student } from '../lib/api';
import { appConfig } from '../lib/config';

type StudentContextValue = {
  student: Student | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  updateCoins: (coins: number) => void;
};

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getStudent(appConfig.defaultStudentId);
      setStudent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar o aluno.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const updateCoins = useCallback((coins: number) => {
    setStudent((prev) => (prev ? { ...prev, coins } : prev));
  }, []);

  return (
    <StudentContext.Provider
      value={{
        student,
        isLoading,
        error,
        refresh: fetchStudent,
        updateCoins,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent(): StudentContextValue {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent deve ser usado dentro de StudentProvider');
  }
  return context;
}
