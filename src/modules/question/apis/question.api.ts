import { IKListReq, IKListResult, IKReq, KApiMethod } from '@krotohmi/k-api';
import { IQuestion} from '~/modules/question/question.type';
import AppApi from '~/app.api';
import { IQuestionListParams } from '~/modules/question/apis/question.list.type';

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
  list: async (config?: Omit<IKReq<IKListResult<IQuestion>, IQuestionListParams>, 'method' | 'url'>) => {
    return await AppApi.list<IQuestion>({
      ...config,
      url: QuestionUrl.genList(),
    });
  },
  detail: (id: string, config?: Omit<IKListReq, 'method' | 'url'>) => {
    return AppApi.list<IQuestion>({
      ...config,
      url: QuestionUrl.genDetail(id),
    });
  },
  import: (config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.request({
      ...config,
      method: KApiMethod.POST,
      url: QuestionUrl.genImport(),
    });
  },
  create: (config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.request({
      ...config,
      method: KApiMethod.POST,
      url: QuestionUrl.genCreate(),
    });
  },
  update: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.request({
      ...config,
      method: KApiMethod.PUT,
      url: QuestionUrl.genUpdate(id),
    });
  },
  del: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.request({
      ...config,
      method: KApiMethod.DELETE,
      url: QuestionUrl.genDel(id),
    });
  },
  resetStreak: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.request({
      ...config,
      method: KApiMethod.POST,
      url: QuestionUrl.genResetStreak(id),
    });
  },
  increaseStreak: (id: string, config?: Omit<IKReq, 'method' | 'url'>) => {
    return AppApi.request({
      ...config,
      method: KApiMethod.POST,
      url: QuestionUrl.genIncreaseStreak(id),
    });
  },
};

export default QuestionApi;
