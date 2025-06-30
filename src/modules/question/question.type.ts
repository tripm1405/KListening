import { IKEntity } from 'k-api';
import { IGroup } from '~/modules/group/group.type';
import { KObj } from 'k-ts';

export interface IQuestion extends IKEntity, KObj {
  speech: string | null;
  answer: string;
  hint: string | null;
  groupId: string;

  group: IGroup;
}
