export interface PasswordFeedbackRequest {
  password: string;
}

export interface FeedbackCriterion {
  criterion: string;
  met: boolean;
}

export type PasswordFeedbackResponse = FeedbackCriterion[];
