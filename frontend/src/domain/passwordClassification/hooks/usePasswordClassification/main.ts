import { useState } from 'react';
import { passwordClassificationService } from '../../services/passwordClassificationService';
import type { UsePasswordClassificationOptions, UsePasswordClassificationReturn } from './types';
import type { PasswordClassificationResponse } from '../../types';

export const usePasswordClassification = (
  options: UsePasswordClassificationOptions = {}
): UsePasswordClassificationReturn => {
  const { onSuccess, onError } = options;

  const [classificationResult, setClassificationResult] =
    useState<PasswordClassificationResponse | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const classifyPassword = async (password: string) => {
    if (!password || password.length < 4) {
      setClassificationResult(null);
      setError(null);
      return;
    }

    setIsClassifying(true);
    setError(null);

    try {
      const result = await passwordClassificationService.classifyPassword({ password });
      setClassificationResult(result);
      onSuccess?.(result);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Erro ao classificar senha');
      setError(error);
      setClassificationResult(null);
      onError?.(error);
    } finally {
      setIsClassifying(false);
    }
  };

  const clearResult = () => {
    setClassificationResult(null);
    setError(null);
  };

  return {
    classifyPassword,
    classificationResult,
    isClassifying,
    error,
    clearResult,
  };
};
