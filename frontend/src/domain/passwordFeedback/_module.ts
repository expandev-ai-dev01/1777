export * from './components';
export * from './hooks';
export * from './services';
export * from './types';

export const passwordFeedbackModuleMetadata = {
  name: 'passwordFeedback',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['PasswordFeedbackList'],
  publicHooks: ['usePasswordFeedback'],
  publicServices: ['passwordFeedbackService'],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['react', 'axios', '@tanstack/react-query'],
  },
  exports: {
    components: ['PasswordFeedbackList'],
    hooks: ['usePasswordFeedback'],
    services: ['passwordFeedbackService'],
    types: ['PasswordFeedbackRequest', 'PasswordFeedbackResponse', 'FeedbackCriterion'],
  },
} as const;
