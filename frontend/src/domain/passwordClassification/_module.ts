export * from './components';
export * from './hooks/usePasswordClassification';
export * from './services';
export * from './types';

export const passwordClassificationModuleMetadata = {
  name: 'passwordClassification',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['PasswordSecurityIndicator'],
  publicHooks: ['usePasswordClassification'],
  publicServices: ['passwordClassificationService'],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['react', 'axios'],
  },
  exports: {
    components: ['PasswordSecurityIndicator'],
    hooks: ['usePasswordClassification'],
    services: ['passwordClassificationService'],
    types: ['PasswordClassificationRequest', 'PasswordClassificationResponse'],
  },
} as const;
