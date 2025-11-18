import { Router } from 'express';
import * as passwordValidationController from '@/api/v1/external/password-validation/controller';
import * as passwordClassificationController from '@/api/v1/external/password-classification/controller';

const router = Router();

router.post('/password-validation', passwordValidationController.postHandler);
router.post('/password-classification', passwordClassificationController.postHandler);

export default router;
