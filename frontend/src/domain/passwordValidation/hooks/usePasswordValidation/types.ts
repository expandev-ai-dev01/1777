import type { PasswordValidationResponse } from '../../types';

export interface UsePasswordValidationOptions {
  onSuccess?: (data: PasswordValidationResponse) => void;
  onError?: (error: Error) => void;
}

export interface UsePasswordValidationReturn {
  validatePassword: (password: string) => Promise<void>;
  validationResult: PasswordValidationResponse | null;
  isValidating: boolean;
  error: Error | null;
  clearResult: () => void;
}
