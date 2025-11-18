import type { PasswordFeedbackProps } from './types';

export const PasswordFeedback = ({ feedbackMessage }: PasswordFeedbackProps) => {
  return (
    <div className="w-full rounded-md bg-blue-50 p-4">
      <p className="text-sm text-blue-800">{feedbackMessage}</p>
    </div>
  );
};
