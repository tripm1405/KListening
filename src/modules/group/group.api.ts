import { IKListReq, IKReq, KApiMethod } from '@krotohmi/k-api';
import { IGroup } from './group.type';
import AppApi from '~/app.api';

export const GroupPrefix = '/groups';

export const GroupUrl = {
  genDetail: (id: string) => `${GroupPrefix}/${id}`,
  genList: () => GroupPrefix,
  genCreate: () => GroupPrefix,
  genUpdate: (id: string) => `${GroupPrefix}/${id}`,
  genDel: (id: string) => `${GroupPrefix}/${id}`,
  genQuestionImport: (id: string) => `${GroupPrefix}/${id}/questions/import`,
};

const GroupApi = {
  list: (config?: Omit<IKListReq, 'method' | 'url'>) => {
    return AppApi.list<IGroup>({
      ...config,
      url: GroupUrl.genList(),
    });
  },
  detail: (id: string, config?: Omit<IKListReq, 'method' | 'url'>) => {
    return AppApi.list<IGroup>({
      ...config,
      url: GroupUrl.genDetail(id),
    });
  },
  create: (config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.request<IGroup['id']>({
      ...config,
      method: KApiMethod.POST,
      url: GroupUrl.genCreate(),
    });
  },
  update: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.request({
      ...config,
      method: KApiMethod.PUT,
      url: GroupUrl.genUpdate(id),
    });
  },
  del: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.request({
      ...config,
      method: KApiMethod.DELETE,
      url: GroupUrl.genDel(id),
    });
  },
  importQuestions: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.request({
      ...config,
      method: KApiMethod.POST,
      url: GroupUrl.genQuestionImport(id),
    });
  },
};

export default GroupApi;
