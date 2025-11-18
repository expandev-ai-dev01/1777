import { publicClient } from '@/core/lib/api';
import type { PasswordValidationRequest, PasswordValidationResponse } from '../types';

export const passwordValidationService = {
  async validatePassword(data: PasswordValidationRequest): Promise<PasswordValidationResponse> {
    const response = await publicClient.post('/password-validation', data);
    return response.data.data;
  },
};
