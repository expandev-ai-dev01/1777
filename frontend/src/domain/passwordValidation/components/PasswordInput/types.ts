export interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidate: (password: string) => void;
  isValidating: boolean;
  error: Error | null;
}
