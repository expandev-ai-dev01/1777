import { UseMutationResult } from '@tanstack/react-query';
import type { PasswordFeedbackResponse, PasswordFeedbackRequest } from '../../types';

export interface UsePasswordFeedbackReturn {
  getFeedbackMutation: UseMutationResult<PasswordFeedbackResponse, Error, PasswordFeedbackRequest>;
}
