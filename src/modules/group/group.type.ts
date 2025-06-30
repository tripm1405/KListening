import { IKEntity } from 'k-api';
import { IQuestion } from '~/modules/question/question.type';
import { KObj } from 'k-ts';

export interface IGroup extends IKEntity, KObj {
  name: string;
  userId: string;

  questions: IQuestion[];
  // ToDo
  // user: IKUser;
}
