export interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  isProcessing: boolean;
  error: Error | null;
}
