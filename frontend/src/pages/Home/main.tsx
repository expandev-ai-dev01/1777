import { useState } from 'react';
import { usePasswordValidation } from '@/domain/passwordValidation/hooks/usePasswordValidation';
import {
  PasswordInput,
  PasswordStrengthIndicator,
  PasswordCriteriaList,
  PasswordFeedback,
} from '@/domain/passwordValidation/components';

export const HomePage = () => {
  const [password, setPassword] = useState('');
  const { validatePassword, validationResult, isValidating, error } = usePasswordValidation();

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
            onChange={setPassword}
            onValidate={validatePassword}
            isValidating={isValidating}
            error={error}
          />

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
