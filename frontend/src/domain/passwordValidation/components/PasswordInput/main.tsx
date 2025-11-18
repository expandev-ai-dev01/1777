import { useState, useEffect } from 'react';
import type { PasswordInputProps } from './types';

export const PasswordInput = ({
  value,
  onChange,
  onValidate,
  isValidating,
  error,
}: PasswordInputProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue.length >= 4) {
        onValidate(localValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localValue, onValidate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full">
      <label htmlFor="password-input" className="mb-2 block text-sm font-medium text-gray-700">
        Digite sua senha
      </label>
      <input
        id="password-input"
        type="password"
        value={localValue}
        onChange={handleChange}
        placeholder="Digite uma senha para validar"
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isValidating}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
      {localValue.length > 0 && localValue.length < 4 && (
        <p className="mt-2 text-sm text-gray-500">
          A senha deve ter pelo menos 4 caracteres para ser analisada
        </p>
      )}
    </div>
  );
};
