import { Router } from 'express';
import * as passwordValidationController from '@/api/v1/external/password-validation/controller';
import * as passwordClassificationController from '@/api/v1/external/password-classification/controller';
import * as passwordFeedbackController from '@/api/v1/external/password-feedback/controller';

const router = Router();

router.post('/password-validation', passwordValidationController.postHandler);
router.post('/password-classification', passwordClassificationController.postHandler);
router.post('/password-feedback', passwordFeedbackController.postHandler);

export default router;
