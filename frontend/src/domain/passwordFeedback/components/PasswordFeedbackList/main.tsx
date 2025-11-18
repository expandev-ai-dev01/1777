import type { PasswordFeedbackListProps } from './types';

const CheckIcon = () => (
  <svg
    className="mr-2 h-5 w-5 flex-shrink-0 text-green-500"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

export const PasswordFeedbackList = ({ criteria, isVisible }: PasswordFeedbackListProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full rounded-md border border-gray-200 bg-gray-50 p-4">
      <ul className="space-y-2">
        {criteria.map((item) => (
          <li
            key={item.criterion}
            className={`flex items-center text-sm ${item.met ? 'text-gray-800' : 'text-gray-500'}`}
          >
            {item.met ? <CheckIcon /> : <CrossIcon />}
            <span>{item.criterion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
