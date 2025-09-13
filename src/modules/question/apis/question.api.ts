import { EKMethod } from '@krotohmi/api';
import { IQuestion } from '~/modules/question/question.type';
import AppApi from '~/app.api';
import { IKReq } from '@krotohmi/axios';

export const QuestionPrefix = '/questions';

export const QuestionUrl = {
  genDetail: (id: string) => `${QuestionPrefix}/${id}`,
  genList: () => QuestionPrefix,
  genImport: () => `${QuestionPrefix}/import`,
  genCreate: () => QuestionPrefix,
  genUpdate: (id: string) => `${QuestionPrefix}/${id}`,
  genDel: (id: string) => `${QuestionPrefix}/${id}`,
  genResetStreak: (id: string) => `${QuestionPrefix}/${id}/reset-streak`,
  genIncreaseStreak: (id: string) => `${QuestionPrefix}/${id}/increase-streak`,
};

const QuestionApi = {
  list: async (config?: Omit<IKReq, 'method' | 'url'>) => {
    return await AppApi.list<IQuestion>({
      ...config,
      url: QuestionUrl.genList(),
    });
  },
  detail: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.list<IQuestion>({
      ...config,
      url: QuestionUrl.genDetail(id),
    });
  },
  import: (config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: EKMethod.POST,
      url: QuestionUrl.genImport(),
    });
  },
  create: (config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: EKMethod.POST,
      url: QuestionUrl.genCreate(),
    });
  },
  update: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: EKMethod.PUT,
      url: QuestionUrl.genUpdate(id),
    });
  },
  del: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: EKMethod.DELETE,
      url: QuestionUrl.genDel(id),
    });
  },
  resetStreak: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: EKMethod.POST,
      url: QuestionUrl.genResetStreak(id),
    });
  },
  increaseStreak: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: EKMethod.POST,
      url: QuestionUrl.genIncreaseStreak(id),
    });
  },
};

export default QuestionApi;
