/**
 * @summary
 * Validates password strength based on multiple security criteria including
 * length, character types, and complexity patterns
 *
 * @function validatePasswordStrength
 * @module passwordValidation
 *
 * @param {string} password - Password to validate
 *
 * @returns {PasswordValidationResult} Detailed validation result with classification
 *
 * @example
 * const result = validatePasswordStrength('MyP@ssw0rd');
 * // Returns: { strengthLevel: 'Forte', score: 75, ... }
 */
export function validatePasswordStrength(password: string): PasswordValidationResult {
  /**
   * @validation Trim whitespace from password
   */
  const trimmedPassword = password.trim();
  const length = trimmedPassword.length;

  /**
   * @rule {RU-005,RU-006,RU-007,RU-008} Analyze character type presence
   */
  const hasLowercase = /[a-z]/.test(trimmedPassword);
  const hasUppercase = /[A-Z]/.test(trimmedPassword);
  const hasNumbers = /[0-9]/.test(trimmedPassword);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?/~`]/.test(trimmedPassword);

  /**
   * @rule {RU-009,RU-010} Calculate criteria count
   */
  let criteriaCount = 0;
  if (hasLowercase) criteriaCount++;
  if (hasUppercase) criteriaCount++;
  if (hasNumbers) criteriaCount++;
  if (hasSpecialChars) criteriaCount++;
  if (length >= 8) criteriaCount++;

  /**
   * @rule {BR-008,BR-009,BR-010,BR-011} Classify strength level and calculate score
   */
  let strengthLevel: StrengthLevel;
  let score: number;
  let colorCode: string;

  if (criteriaCount <= 1 || (length >= 4 && length <= 7 && criteriaCount <= 2)) {
    strengthLevel = 'Fraca';
    score = Math.min(25, (criteriaCount / 5) * 25 + (length / 100) * 25);
    colorCode = '#dc3545';
  } else if ((criteriaCount === 2 || criteriaCount === 3) && length >= 8 && length <= 11) {
    strengthLevel = 'Média';
    score = 26 + ((criteriaCount - 2) / 3) * 24 + ((length - 8) / 4) * 10;
    colorCode = '#ffc107';
  } else if (criteriaCount === 4 && length >= 12) {
    strengthLevel = 'Forte';
    score = 51 + ((length - 12) / 4) * 24;
    colorCode = '#28a745';
  } else if (criteriaCount === 5 && length >= 16) {
    strengthLevel = 'Muito Forte';
    score = 76 + Math.min(24, ((length - 16) / 10) * 24);
    colorCode = '#155724';
  } else if (criteriaCount >= 4 && length >= 12) {
    strengthLevel = 'Forte';
    score = 51 + ((criteriaCount - 4) / 1) * 12 + ((length - 12) / 8) * 12;
    colorCode = '#28a745';
  } else {
    strengthLevel = 'Média';
    score = 26 + (criteriaCount / 5) * 24;
    colorCode = '#ffc107';
  }

  score = Math.round(Math.min(100, Math.max(0, score)));

  /**
   * @rule {BR-012,BR-013} Generate detailed criteria feedback
   */
  const metCriteria: CriteriaItem[] = [];
  const missingCriteria: CriteriaItem[] = [];

  if (hasLowercase) {
    metCriteria.push({
      criterion: 'Letras minúsculas',
      description: 'Contém pelo menos uma letra minúscula (a-z)',
    });
  } else {
    missingCriteria.push({
      criterion: 'Letras minúsculas',
      description: 'Adicione pelo menos uma letra minúscula (a-z)',
    });
  }

  if (hasUppercase) {
    metCriteria.push({
      criterion: 'Letras maiúsculas',
      description: 'Contém pelo menos uma letra maiúscula (A-Z)',
    });
  } else {
    missingCriteria.push({
      criterion: 'Letras maiúsculas',
      description: 'Adicione pelo menos uma letra maiúscula (A-Z)',
    });
  }

  if (hasNumbers) {
    metCriteria.push({
      criterion: 'Números',
      description: 'Contém pelo menos um número (0-9)',
    });
  } else {
    missingCriteria.push({
      criterion: 'Números',
      description: 'Adicione pelo menos um número (0-9)',
    });
  }

  if (hasSpecialChars) {
    metCriteria.push({
      criterion: 'Caracteres especiais',
      description: 'Contém pelo menos um caractere especial (!@#$%^&* etc.)',
    });
  } else {
    missingCriteria.push({
      criterion: 'Caracteres especiais',
      description: 'Adicione pelo menos um caractere especial (!@#$%^&* etc.)',
    });
  }

  if (length >= 8) {
    metCriteria.push({
      criterion: 'Comprimento adequado',
      description: `Possui ${length} caracteres (recomendado: 8 ou mais)`,
    });
  } else {
    missingCriteria.push({
      criterion: 'Comprimento adequado',
      description: `Possui apenas ${length} caracteres. Recomendado: 8 ou mais caracteres`,
    });
  }

  /**
   * @rule {BR-014} Generate personalized feedback message
   */
  let feedbackMessage: string;
  if (strengthLevel === 'Fraca') {
    feedbackMessage =
      'Sua senha é fraca e pode ser facilmente comprometida. Considere adicionar mais tipos de caracteres e aumentar o comprimento.';
  } else if (strengthLevel === 'Média') {
    feedbackMessage =
      'Sua senha tem segurança média. Para melhorar, adicione mais tipos de caracteres e aumente o comprimento para pelo menos 12 caracteres.';
  } else if (strengthLevel === 'Forte') {
    feedbackMessage =
      'Sua senha é forte e oferece boa proteção. Para segurança máxima, considere aumentar o comprimento para 16 ou mais caracteres.';
  } else {
    feedbackMessage =
      'Excelente! Sua senha é muito forte e oferece proteção robusta contra ataques.';
  }

  return {
    strengthLevel,
    score,
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSpecialChars,
    length,
    criteriaCount,
    metCriteria,
    missingCriteria,
    feedbackMessage,
    colorCode,
  };
}

export type StrengthLevel = 'Fraca' | 'Média' | 'Forte' | 'Muito Forte';

export interface CriteriaItem {
  criterion: string;
  description: string;
}

export interface PasswordValidationResult {
  strengthLevel: StrengthLevel;
  score: number;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumbers: boolean;
  hasSpecialChars: boolean;
  length: number;
  criteriaCount: number;
  metCriteria: CriteriaItem[];
  missingCriteria: CriteriaItem[];
  feedbackMessage: string;
  colorCode: string;
}
