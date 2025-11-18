export interface PasswordValidationRequest {
  password: string;
}

export interface PasswordValidationResponse {
  strengthLevel: 'Fraca' | 'Média' | 'Forte' | 'Muito Forte';
  score: number;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumbers: boolean;
  hasSpecialChars: boolean;
  length: number;
  criteriaCount: number;
  metCriteria: Array<{
    criterion: string;
    description: string;
  }>;
  missingCriteria: Array<{
    criterion: string;
    suggestion: string;
  }>;
  feedbackMessage: string;
  colorCode: string;
}

export interface PasswordStrengthIndicatorProps {
  score: number;
  strengthLevel: string;
  colorCode: string;
}

export interface PasswordCriteriaListProps {
  metCriteria: Array<{
    criterion: string;
    description: string;
  }>;
  missingCriteria: Array<{
    criterion: string;
    suggestion: string;
  }>;
}
