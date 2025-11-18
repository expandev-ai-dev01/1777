import { useMutation } from '@tanstack/react-query';
import { passwordFeedbackService } from '../../services/passwordFeedbackService';
import type { UsePasswordFeedbackReturn } from './types';

export const usePasswordFeedback = (): UsePasswordFeedbackReturn => {
  const getFeedbackMutation = useMutation({
    mutationFn: passwordFeedbackService.getFeedback,
  });

  return {
    getFeedbackMutation,
  };
};
