import type { PasswordInputProps } from './types';

export const PasswordInput = ({ value, onChange, isProcessing, error }: PasswordInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      <label htmlFor="password-input" className="mb-2 block text-sm font-medium text-gray-700">
        Digite sua senha
      </label>
      <input
        id="password-input"
        type="password"
        value={value}
        onChange={handleChange}
        placeholder="Digite uma senha para validar"
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isProcessing}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
      {value.length > 0 && value.length < 4 && (
        <p className="mt-2 text-sm text-gray-500">
          A senha deve ter pelo menos 4 caracteres para ser analisada
        </p>
      )}
    </div>
  );
};
