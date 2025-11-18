export interface PasswordClassificationRequest {
  password: string;
}

export interface PasswordClassificationResponse {
  securityLevel: 'Fraca' | 'Média' | 'Forte' | 'Muito Forte';
  securityScore: number;
  colorIndicator: string;
  indicatorSize: number;
  showIndicator: boolean;
  criteriaAnalysis: {
    length: number;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecialChars: boolean;
    criteriaMet: number;
  };
  scoringBreakdown: {
    lengthPoints: number;
    uppercasePoints: number;
    lowercasePoints: number;
    numberPoints: number;
    specialCharPoints: number;
    diversityPoints: number;
    totalScore: number;
  };
}

export interface PasswordSecurityIndicatorProps {
  securityLevel: string;
  securityScore: number;
  colorIndicator: string;
  indicatorSize: number;
  showIndicator: boolean;
}
