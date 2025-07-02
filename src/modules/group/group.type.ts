import { IKEntity } from '@krotohmi/k-api';
import { IQuestion } from '~/modules/question/question.type';
import { KObj } from '@krotohmi/k-ts';

export interface IGroup extends IKEntity, KObj {
  name: string;
  userId: string;

  questions: IQuestion[];
  // ToDo: KClient
  // user: IKUser;
}
