import type { PasswordClassificationResponse } from '../../types';

export interface UsePasswordClassificationOptions {
  onSuccess?: (data: PasswordClassificationResponse) => void;
  onError?: (error: Error) => void;
}

export interface UsePasswordClassificationReturn {
  classifyPassword: (password: string) => Promise<void>;
  classificationResult: PasswordClassificationResponse | null;
  isClassifying: boolean;
  error: Error | null;
  clearResult: () => void;
}
