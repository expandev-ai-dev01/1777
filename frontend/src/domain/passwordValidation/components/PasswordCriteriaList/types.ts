export interface PasswordCriteriaListProps {
  metCriteria: Array<{
    criterion: string;
    description: string;
  }>;
  missingCriteria: Array<{
    criterion: string;
    suggestion: string;
  }>;
}
