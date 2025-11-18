export * from './components';
export * from './hooks/usePasswordValidation';
export * from './services';
export * from './types';

export const passwordValidationModuleMetadata = {
  name: 'passwordValidation',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: [
    'PasswordInput',
    'PasswordStrengthIndicator',
    'PasswordCriteriaList',
    'PasswordFeedback',
  ],
  publicHooks: ['usePasswordValidation'],
  publicServices: ['passwordValidationService'],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['react', 'axios'],
  },
  exports: {
    components: [
      'PasswordInput',
      'PasswordStrengthIndicator',
      'PasswordCriteriaList',
      'PasswordFeedback',
    ],
    hooks: ['usePasswordValidation'],
    services: ['passwordValidationService'],
    types: [
      'PasswordValidationRequest',
      'PasswordValidationResponse',
      'PasswordStrengthIndicatorProps',
      'PasswordCriteriaListProps',
    ],
  },
} as const;
