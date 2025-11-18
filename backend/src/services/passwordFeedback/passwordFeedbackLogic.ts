/**
 * @summary
 * Represents a single validation criterion and its status.
 *
 * @interface FeedbackCriterion
 * @property {string} criterion - The description of the criterion.
 * @property {boolean} met - True if the criterion is met, otherwise false.
 */
export interface FeedbackCriterion {
  criterion: string;
  met: boolean;
}

/**
 * @summary
 * Represents the complete list of feedback criteria for a password.
 *
 * @type {PasswordFeedbackResult}
 */
export type PasswordFeedbackResult = FeedbackCriterion[];

/**
 * @summary
 * Evaluates a password against a set of predefined security criteria and returns detailed feedback.
 * This function is designed for real-time UI updates as a user types their password.
 *
 * @function getPasswordValidationFeedback
 * @module passwordFeedback
 *
 * @param {string} password - The password string to evaluate.
 *
 * @returns {PasswordFeedbackResult} An array of objects, each representing a criterion and its status.
 *
 * @example
 * const result = getPasswordValidationFeedback('Abc1!');
 * // Returns: [
 * //   { criterion: 'Pelo menos 4 caracteres', met: true },
 * //   { criterion: 'Conter letras maiúsculas (A-Z)', met: true },
 * //   { criterion: 'Conter letras minúsculas (a-z)', met: true },
 * //   { criterion: 'Conter números (0-9)', met: true },
 * //   { criterion: 'Conter caracteres especiais (!@#)', met: true }
 * // ]
 */
export function getPasswordValidationFeedback(password: string): PasswordFeedbackResult {
  /**
   * @rule {BR-005, BR-006, BR-007, BR-008, BR-009}
   * Defines the list of validation criteria based on business rules.
   */
  const criteria: { label: string; test: (p: string) => boolean }[] = [
    {
      label: 'Pelo menos 4 caracteres',
      test: (p) => p.length >= 4,
    },
    {
      label: 'Conter letras maiúsculas (A-Z)',
      test: (p) => /[A-Z]/.test(p),
    },
    {
      label: 'Conter letras minúsculas (a-z)',
      test: (p) => /[a-z]/.test(p),
    },
    {
      label: 'Conter números (0-9)',
      test: (p) => /[0-9]/.test(p),
    },
    {
      label: 'Conter caracteres especiais (!@#)',
      test: (p) => /[!@#]/.test(p),
    },
  ];

  return criteria.map(({ label, test }) => ({
    criterion: label,
    met: test(password),
  }));
}
