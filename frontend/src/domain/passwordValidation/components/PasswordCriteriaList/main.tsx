import type { PasswordCriteriaListProps } from './types';

export const PasswordCriteriaList = ({
  metCriteria,
  missingCriteria,
}: PasswordCriteriaListProps) => {
  return (
    <div className="w-full space-y-4">
      {metCriteria.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-green-700">Critérios atendidos:</h3>
          <ul className="space-y-1">
            {metCriteria.map((item, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <svg
                  className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>{item.criterion}:</strong> {item.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {missingCriteria.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-orange-700">Sugestões para melhorar:</h3>
          <ul className="space-y-1">
            {missingCriteria.map((item, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <svg
                  className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>{item.criterion}:</strong> {item.suggestion}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
