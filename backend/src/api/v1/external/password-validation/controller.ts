import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { validatePasswordStrength } from '@/services/passwordValidation';

/**
 * @api {post} /api/v1/external/password-validation Validate Password Strength
 * @apiName ValidatePasswordStrength
 * @apiGroup PasswordValidation
 * @apiVersion 1.0.0
 *
 * @apiDescription Analyzes password strength based on multiple security criteria
 * and returns detailed feedback with classification
 *
 * @apiParam {String} password Password to validate (4-100 characters)
 *
 * @apiSuccess {String} strengthLevel Password strength classification (Fraca, Média, Forte, Muito Forte)
 * @apiSuccess {Number} score Numeric score (0-100)
 * @apiSuccess {Boolean} hasLowercase Contains lowercase letters
 * @apiSuccess {Boolean} hasUppercase Contains uppercase letters
 * @apiSuccess {Boolean} hasNumbers Contains numbers
 * @apiSuccess {Boolean} hasSpecialChars Contains special characters
 * @apiSuccess {Number} length Password length
 * @apiSuccess {Number} criteriaCount Number of criteria met
 * @apiSuccess {Array} metCriteria List of met criteria with descriptions
 * @apiSuccess {Array} missingCriteria List of missing criteria with suggestions
 * @apiSuccess {String} feedbackMessage Personalized feedback message
 * @apiSuccess {String} colorCode Color code for visual representation
 *
 * @apiError {String} ValidationError Invalid password provided
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodySchema = z.object({
    password: z
      .string()
      .min(4, 'A senha deve ter pelo menos 4 caracteres para ser analisada')
      .max(100, 'A senha excede o limite máximo de 100 caracteres'),
  });

  try {
    const validated = bodySchema.parse(req.body);

    const result = validatePasswordStrength(validated.password);

    res.json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR'));
    } else {
      next(error);
    }
  }
}
