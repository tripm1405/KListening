import { EKMethod } from '@krotohmi/api';
import { IGroup } from './group.type';
import AppApi from '~/app.api';
import { IKReq } from '@krotohmi/axios';

export const GroupPrefix = '/groups';

export const GroupUrl = {
  genDetail: (id: string) => `${GroupPrefix}/${id}`,
  genList: () => GroupPrefix,
  genCreate: () => GroupPrefix,
  genUpdate: (id: string) => `${GroupPrefix}/${id}`,
  genDel: (id: string) => `${GroupPrefix}/${id}`,
  genResetStreak: (id: string) => `${GroupPrefix}/${id}/reset-streak`,
  genQuestionImport: (id: string) => `${GroupPrefix}/${id}/questions/import`,
};

const GroupApi = {
  list: (config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.list<IGroup>({
      ...config,
      url: GroupUrl.genList(),
    });
  },
  detail: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.list<IGroup>({
      ...config,
      url: GroupUrl.genDetail(id),
    });
  },
  create: (config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.api<IGroup['id']>({
      ...config,
      method: EKMethod.POST,
      url: GroupUrl.genCreate(),
    });
  },
  update: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: EKMethod.PUT,
      url: GroupUrl.genUpdate(id),
    });
  },
  del: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: EKMethod.DELETE,
      url: GroupUrl.genDel(id),
    });
  },
  resetStreak: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.api<IGroup['id']>({
      ...config,
      method: EKMethod.POST,
      url: GroupUrl.genResetStreak(id),
    });
  },
  importQuestions: (
    id: string,
    config?: Omit<IKReq, 'method' | 'url'>,
  ) => {
    return AppApi.api({
      ...config,
      method: EKMethod.POST,
      url: GroupUrl.genQuestionImport(id),
    });
  },
};

export default GroupApi;
