import { IKApiListData, IKApiListResult, KApiMethod } from '@krotohmi/api';
import { IQuestion} from '~/modules/question/question.type';
import AppApi from '~/app.api';
import { IQuestionListParams } from '~/modules/question/apis/question.list.type';
import { IKAxiosReq } from '@krotohmi/axios';

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
  list: async (config?: Omit<IKAxiosReq, 'method' | 'url'>) => {
    return await AppApi.list<IQuestion>({
      ...config,
      url: QuestionUrl.genList(),
    });
  },
  detail: (id: string, config?: Omit<IKAxiosReq, 'method' | 'url'>) => {
    return AppApi.list<IQuestion>({
      ...config,
      url: QuestionUrl.genDetail(id),
    });
  },
  import: (config?: Omit<IKAxiosReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: KApiMethod.POST,
      url: QuestionUrl.genImport(),
    });
  },
  create: (config?: Omit<IKAxiosReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: KApiMethod.POST,
      url: QuestionUrl.genCreate(),
    });
  },
  update: (id: string, config?: Omit<IKAxiosReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: KApiMethod.PUT,
      url: QuestionUrl.genUpdate(id),
    });
  },
  del: (id: string, config?: Omit<IKAxiosReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: KApiMethod.DELETE,
      url: QuestionUrl.genDel(id),
    });
  },
  resetStreak: (id: string, config?: Omit<IKAxiosReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: KApiMethod.POST,
      url: QuestionUrl.genResetStreak(id),
    });
  },
  increaseStreak: (id: string, config?: Omit<IKAxiosReq, 'method' | 'url'>) => {
    return AppApi.api({
      ...config,
      method: KApiMethod.POST,
      url: QuestionUrl.genIncreaseStreak(id),
    });
  },
};

export default QuestionApi;
