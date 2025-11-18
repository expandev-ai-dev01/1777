import { useState, useEffect } from 'react';
import { usePasswordValidation } from '@/domain/passwordValidation/hooks/usePasswordValidation';
import { usePasswordClassification } from '@/domain/passwordClassification/hooks/usePasswordClassification';
import { usePasswordFeedback } from '@/domain/passwordFeedback/hooks/usePasswordFeedback';
import {
  PasswordInput,
  PasswordStrengthIndicator,
  PasswordCriteriaList,
  PasswordFeedback,
} from '@/domain/passwordValidation/components';
import { PasswordSecurityIndicator } from '@/domain/passwordClassification/components';
import { PasswordFeedbackList } from '@/domain/passwordFeedback/components';
import { useDebounce } from '@/core/hooks/useDebounce';

export const HomePage = () => {
  const [password, setPassword] = useState('');
  const debouncedPassword = useDebounce(password, 500);

  const {
    validatePassword,
    validationResult,
    isValidating,
    error: validationError,
    clearResult: clearValidationResult,
  } = usePasswordValidation();
  const {
    classifyPassword,
    classificationResult,
    isClassifying,
    clearResult: clearClassificationResult,
  } = usePasswordClassification();
  const { getFeedbackMutation } = usePasswordFeedback();

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    getFeedbackMutation.mutate({ password: newPassword });

    if (newPassword.length === 0) {
      clearValidationResult();
      clearClassificationResult();
      getFeedbackMutation.reset();
    }
  };

  useEffect(() => {
    if (debouncedPassword.length >= 4) {
      validatePassword(debouncedPassword);
      classifyPassword(debouncedPassword);
    } else {
      clearValidationResult();
      clearClassificationResult();
    }
  }, [
    debouncedPassword,
    validatePassword,
    classifyPassword,
    clearValidationResult,
    clearClassificationResult,
  ]);

  const isProcessing = isValidating || isClassifying;
  const feedbackListIsVisible = password.length > 0 && getFeedbackMutation.data != null;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Validador de Senhas</h2>
        <p className="mb-8 text-center text-gray-600">
          Digite uma senha para verificar sua força e receber recomendações de segurança.
        </p>

        <div className="space-y-6">
          <PasswordInput
            value={password}
            onChange={handlePasswordChange}
            isProcessing={isProcessing}
            error={validationError}
          />

          {getFeedbackMutation.data && (
            <PasswordFeedbackList
              criteria={getFeedbackMutation.data}
              isVisible={feedbackListIsVisible}
            />
          )}

          {classificationResult && (
            <PasswordSecurityIndicator
              securityLevel={classificationResult.securityLevel}
              securityScore={classificationResult.securityScore}
              colorIndicator={classificationResult.colorIndicator}
              indicatorSize={classificationResult.indicatorSize}
              showIndicator={classificationResult.showIndicator}
            />
          )}

          {validationResult && (
            <>
              <PasswordStrengthIndicator
                score={validationResult.score}
                strengthLevel={validationResult.strengthLevel}
                colorCode={validationResult.colorCode}
              />

              <PasswordFeedback feedbackMessage={validationResult.feedbackMessage} />

              <PasswordCriteriaList
                metCriteria={validationResult.metCriteria}
                missingCriteria={validationResult.missingCriteria}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
