import { useState } from 'react';
import { passwordValidationService } from '../../services/passwordValidationService';
import type { UsePasswordValidationOptions, UsePasswordValidationReturn } from './types';
import type { PasswordValidationResponse } from '../../types';

export const usePasswordValidation = (
  options: UsePasswordValidationOptions = {}
): UsePasswordValidationReturn => {
  const { onSuccess, onError } = options;

  const [validationResult, setValidationResult] = useState<PasswordValidationResponse | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const validatePassword = async (password: string) => {
    if (!password || password.length < 4) {
      setValidationResult(null);
      setError(null);
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const result = await passwordValidationService.validatePassword({ password });
      setValidationResult(result);
      onSuccess?.(result);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Erro ao validar senha');
      setError(error);
      setValidationResult(null);
      onError?.(error);
    } finally {
      setIsValidating(false);
    }
  };

  const clearResult = () => {
    setValidationResult(null);
    setError(null);
  };

  return {
    validatePassword,
    validationResult,
    isValidating,
    error,
    clearResult,
  };
};
