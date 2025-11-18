import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { getPasswordValidationFeedback } from '@/services/passwordFeedback';

/**
 * @api {post} /api/v1/external/password-feedback Get Password Validation Feedback
 * @apiName GetPasswordValidationFeedback
 * @apiGroup PasswordFeedback
 * @apiVersion 1.0.0
 *
 * @apiDescription Provides real-time feedback on password criteria compliance.
 * Returns a list of security criteria and whether each has been met.
 *
 * @apiParam {String} password The password string to evaluate. Can be an empty string.
 *
 * @apiSuccess {Object[]} data List of feedback criteria.
 * @apiSuccess {String} data.criterion Description of the validation criterion.
 * @apiSuccess {Boolean} data.met Status indicating if the criterion is met (true) or not (false).
 *
 * @apiError {String} ValidationError Invalid request body provided.
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodySchema = z.object({
    password: z.string().max(100, 'A senha não deve exceder 100 caracteres').default(''),
  });

  try {
    const validated = bodySchema.parse(req.body);

    const result = getPasswordValidationFeedback(validated.password);

    res.json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR'));
    } else {
      next(error);
    }
  }
}
