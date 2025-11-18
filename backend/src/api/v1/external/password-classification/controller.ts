import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { classifyPasswordSecurity } from '@/services/passwordClassification';

/**
 * @api {post} /api/v1/external/password-classification Classify Password Security Level
 * @apiName ClassifyPasswordSecurity
 * @apiGroup PasswordClassification
 * @apiVersion 1.0.0
 *
 * @apiDescription Classifies password security level (Fraca, Média, Forte, Muito Forte)
 * based on complexity criteria analysis and returns visual indicator data
 *
 * @apiParam {String} password Password to classify (4-100 characters)
 *
 * @apiSuccess {String} securityLevel Security classification (Fraca, Média, Forte, Muito Forte)
 * @apiSuccess {Number} securityScore Numeric score (0-100)
 * @apiSuccess {String} colorIndicator Hex color code for visual representation
 * @apiSuccess {Number} indicatorSize Percentage fill (0-100)
 * @apiSuccess {Boolean} showIndicator Whether to display visual indicator
 * @apiSuccess {Object} criteriaAnalysis Detailed criteria breakdown
 * @apiSuccess {Object} scoringBreakdown Detailed scoring information
 *
 * @apiError {String} ValidationError Invalid password provided
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodySchema = z.object({
    password: z
      .string()
      .min(4, 'A senha deve ter pelo menos 4 caracteres para ser analisada')
      .max(100, 'A senha não deve exceder 100 caracteres'),
  });

  try {
    const validated = bodySchema.parse(req.body);

    const result = classifyPasswordSecurity(validated.password);

    res.json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR'));
    } else {
      next(error);
    }
  }
}
