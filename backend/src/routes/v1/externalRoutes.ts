import { Router } from 'express';
import * as passwordValidationController from '@/api/v1/external/password-validation/controller';

const router = Router();

router.post('/password-validation', passwordValidationController.postHandler);

export default router;
