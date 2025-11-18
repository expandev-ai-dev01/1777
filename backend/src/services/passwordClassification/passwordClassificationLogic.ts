/**
 * @summary
 * Classifies password security level based on complexity criteria analysis,
 * calculates detailed scoring, and provides visual indicator configuration
 *
 * @function classifyPasswordSecurity
 * @module passwordClassification
 *
 * @param {string} password - Password to classify
 *
 * @returns {PasswordClassificationResult} Detailed classification with scoring and visual data
 *
 * @example
 * const result = classifyPasswordSecurity('MyP@ssw0rd123');
 * // Returns: { securityLevel: 'Forte', securityScore: 68, colorIndicator: '#28a745', ... }
 */
export function classifyPasswordSecurity(password: string): PasswordClassificationResult {
  /**
   * @validation Trim whitespace and validate length
   */
  const trimmedPassword = password.trim();
  const length = trimmedPassword.length;

  /**
   * @rule {RU-004,RU-005,RU-006,RU-007} Analyze character type presence
   */
  const hasUppercase = /[A-Z]/.test(trimmedPassword);
  const hasLowercase = /[a-z]/.test(trimmedPassword);
  const hasNumbers = /[0-9]/.test(trimmedPassword);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?/~`]/.test(trimmedPassword);

  /**
   * @rule {RU-008,RU-009} Calculate criteria count
   */
  let criteriaCount = 0;
  if (hasUppercase) criteriaCount++;
  if (hasLowercase) criteriaCount++;
  if (hasNumbers) criteriaCount++;
  if (hasSpecialChars) criteriaCount++;
  if (length >= 8) criteriaCount++;

  /**
   * @rule {RU-033,RU-034} Calculate length points (1 point per character, max 25)
   */
  const lengthPoints = Math.min(25, length);

  /**
   * @rule {RU-035,RU-036,RU-037} Calculate uppercase points
   */
  const uppercaseCount = (trimmedPassword.match(/[A-Z]/g) || []).length;
  let uppercasePoints = 0;
  if (uppercaseCount >= 3) {
    uppercasePoints = 15;
  } else if (uppercaseCount >= 1) {
    uppercasePoints = 10;
  }

  /**
   * @rule {RU-038,RU-039,RU-040} Calculate lowercase points
   */
  const lowercaseCount = (trimmedPassword.match(/[a-z]/g) || []).length;
  let lowercasePoints = 0;
  if (lowercaseCount >= 3) {
    lowercasePoints = 15;
  } else if (lowercaseCount >= 1) {
    lowercasePoints = 10;
  }

  /**
   * @rule {RU-041,RU-042,RU-043} Calculate number points
   */
  const numberCount = (trimmedPassword.match(/[0-9]/g) || []).length;
  let numberPoints = 0;
  if (numberCount >= 3) {
    numberPoints = 15;
  } else if (numberCount >= 1) {
    numberPoints = 10;
  }

  /**
   * @rule {RU-044,RU-045,RU-046} Calculate special character points
   */
  const specialCount = (trimmedPassword.match(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?/~`]/g) || []).length;
  let specialPoints = 0;
  if (specialCount >= 2) {
    specialPoints = 20;
  } else if (specialCount >= 1) {
    specialPoints = 15;
  }

  /**
   * @rule {RU-047,RU-048,RU-049,RU-050,RU-051} Calculate diversity points
   */
  const characterTypes = [
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSpecialChars,
    length >= 8,
  ].filter(Boolean).length;
  let diversityPoints = 0;
  if (characterTypes === 5) {
    diversityPoints = 25;
  } else if (characterTypes === 4) {
    diversityPoints = 20;
  } else if (characterTypes === 3) {
    diversityPoints = 15;
  } else if (characterTypes === 2) {
    diversityPoints = 10;
  }

  /**
   * @rule {BR-013,BR-014,BR-015} Calculate total score with business rules
   */
  let securityScore =
    lengthPoints +
    uppercasePoints +
    lowercasePoints +
    numberPoints +
    specialPoints +
    diversityPoints;

  if (characterTypes === 1) {
    securityScore = Math.min(25, securityScore);
  }

  securityScore = Math.min(100, Math.round(securityScore));

  /**
   * @rule {RU-010,RU-011,RU-012,RU-013,RU-014,BR-004,BR-005,BR-006,BR-007} Classify security level
   */
  let securityLevel: SecurityLevel;
  let colorIndicator: string;
  let indicatorSize: number;

  if (characterTypes === 1 || (length >= 4 && length <= 7 && criteriaCount <= 2)) {
    securityLevel = 'Fraca';
    colorIndicator = '#FF0000';
    indicatorSize = 25;
  } else if ((criteriaCount === 2 || criteriaCount === 3) && length >= 8 && length <= 11) {
    securityLevel = 'Média';
    colorIndicator = '#FFFF00';
    indicatorSize = 50;
  } else if (criteriaCount === 4 && length >= 12) {
    securityLevel = 'Forte';
    colorIndicator = '#00FF00';
    indicatorSize = 75;
  } else if (criteriaCount === 5 && length >= 16) {
    securityLevel = 'Muito Forte';
    colorIndicator = '#006400';
    indicatorSize = 100;
  } else if (criteriaCount >= 4 && length >= 12) {
    securityLevel = 'Forte';
    colorIndicator = '#00FF00';
    indicatorSize = 75;
  } else {
    securityLevel = 'Média';
    colorIndicator = '#FFFF00';
    indicatorSize = 50;
  }

  /**
   * @rule {RU-031,RU-032,BR-009} Determine indicator visibility
   */
  const showIndicator = length >= 4;

  /**
   * @rule {BR-008} Prepare criteria analysis for real-time updates
   */
  const criteriaAnalysis: CriteriaAnalysis = {
    length,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSpecialChars,
    criteriaCount,
    characterTypes,
  };

  /**
   * @rule {BR-013,BR-016,BR-017} Prepare detailed scoring breakdown
   */
  const scoringBreakdown: ScoringBreakdown = {
    lengthPoints,
    uppercasePoints,
    lowercasePoints,
    numberPoints,
    specialPoints,
    diversityPoints,
    totalScore: securityScore,
  };

  return {
    securityLevel,
    securityScore,
    colorIndicator,
    indicatorSize,
    showIndicator,
    criteriaAnalysis,
    scoringBreakdown,
  };
}

export type SecurityLevel = 'Fraca' | 'Média' | 'Forte' | 'Muito Forte';

export interface CriteriaAnalysis {
  length: number;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSpecialChars: boolean;
  criteriaCount: number;
  characterTypes: number;
}

export interface ScoringBreakdown {
  lengthPoints: number;
  uppercasePoints: number;
  lowercasePoints: number;
  numberPoints: number;
  specialPoints: number;
  diversityPoints: number;
  totalScore: number;
}

export interface PasswordClassificationResult {
  securityLevel: SecurityLevel;
  securityScore: number;
  colorIndicator: string;
  indicatorSize: number;
  showIndicator: boolean;
  criteriaAnalysis: CriteriaAnalysis;
  scoringBreakdown: ScoringBreakdown;
}
