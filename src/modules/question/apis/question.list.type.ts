import { KObj } from '@krotohmi/ts';

export interface IQuestionListParams extends KObj {
  pagination?: {
    size?: number;
    page?: number;
  };
  filters?: {
    groupId?: string;
    streak?: {
      min?: number;
      max?: number;
    };
  };
}