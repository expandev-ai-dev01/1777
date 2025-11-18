import { publicClient } from '@/core/lib/api';
import type { PasswordClassificationRequest, PasswordClassificationResponse } from '../types';

export const passwordClassificationService = {
  async classifyPassword(
    data: PasswordClassificationRequest
  ): Promise<PasswordClassificationResponse> {
    const response = await publicClient.post('/password-classification', data);
    return response.data.data;
  },
};
