import { publicClient } from '@/core/lib/api';
import type { PasswordFeedbackRequest, PasswordFeedbackResponse } from '../types';

export const passwordFeedbackService = {
  async getFeedback(data: PasswordFeedbackRequest): Promise<PasswordFeedbackResponse> {
    const response = await publicClient.post('/password-feedback', data);
    return response.data.data;
  },
};
