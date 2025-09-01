import { IGroup } from '~/modules/group/group.type';

export interface IQuestion {
  id: string;
  speech: string | null;
  answer: string;
  hint: string | null;
  streak: number;
  groupId: string;

  group: IGroup;
}
