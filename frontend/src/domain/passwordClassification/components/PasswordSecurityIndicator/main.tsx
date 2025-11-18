import type { PasswordSecurityIndicatorProps } from './types';

export const PasswordSecurityIndicator = ({
  securityLevel,
  securityScore,
  colorIndicator,
  indicatorSize,
  showIndicator,
}: PasswordSecurityIndicatorProps) => {
  if (!showIndicator) {
    return null;
  }

  const getBackgroundColor = () => {
    return colorIndicator;
  };

  const getTextColor = () => {
    switch (securityLevel) {
      case 'Fraca':
        return 'text-red-700';
      case 'Média':
        return 'text-yellow-700';
      case 'Forte':
        return 'text-green-600';
      case 'Muito Forte':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Nível de Segurança:</span>
        <span className={`text-sm font-bold ${getTextColor()}`}>{securityLevel}</span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${indicatorSize}%`,
            backgroundColor: getBackgroundColor(),
          }}
        />
      </div>
      <div className="mt-1 text-right text-xs text-gray-500">Pontuação: {securityScore}/100</div>
    </div>
  );
};
