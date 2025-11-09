const sanitizeBaseUrl = (url: string) => url.replace(/\/$/, "");

const DEFAULT_API_BASE_URL = "http://localhost:8080/api/v1";

export const appConfig = {
  apiBaseUrl: sanitizeBaseUrl(
    import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL
  ),
  defaultStudentId: Number(import.meta.env.VITE_STUDENT_ID ?? 1),
  defaultGroupId: Number(import.meta.env.VITE_GROUP_ID ?? 1),
};

export type OperationResult<T> = {
  status: string;
  statusCode: number;
  message: string;
  data: T;
};
