import type { PasswordStrengthIndicatorProps } from './types';

export const PasswordStrengthIndicator = ({
  score,
  strengthLevel,
  colorCode,
}: PasswordStrengthIndicatorProps) => {
  const getColorClasses = () => {
    switch (colorCode) {
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'lightgreen':
        return 'bg-green-400';
      case 'darkgreen':
        return 'bg-green-600';
      default:
        return 'bg-gray-300';
    }
  };

  const getTextColorClasses = () => {
    switch (colorCode) {
      case 'red':
        return 'text-red-600';
      case 'yellow':
        return 'text-yellow-600';
      case 'lightgreen':
        return 'text-green-500';
      case 'darkgreen':
        return 'text-green-700';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Força da senha:</span>
        <span className={`text-sm font-bold ${getTextColorClasses()}`}>{strengthLevel}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full transition-all duration-500 ${getColorClasses()}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="mt-1 text-right text-xs text-gray-500">{score}/100</div>
    </div>
  );
};
