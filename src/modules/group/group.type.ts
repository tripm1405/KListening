import { IQuestion } from '~/modules/question/question.type';
import { IKUser } from '@krotohmi/client';

export interface IGroup {
  id: string;
  name: string;
  userId: string;

  questions: IQuestion[];
  user: IKUser;
}
