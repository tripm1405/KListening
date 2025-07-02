import { IKListReq, IKReq, KApiMethod } from '@krotohmi/k-api';
import { IQuestion} from '~/modules/question/question.type';
import AppApi from '~/app.api';

export const QuestionPrefix = '/questions';

export const QuestionUrl = {
  genDetail: (id: string) => `${QuestionPrefix}/${id}`,
  genList: () => QuestionPrefix,
  genImport: () => `${QuestionPrefix}/import`,
  genCreate: () => QuestionPrefix,
  genUpdate: (id: string) => `${QuestionPrefix}/${id}`,
  genDel: (id: string) => `${QuestionPrefix}/${id}`,
};

const QuestionApi = {
  list: (config?: Omit<IKListReq, 'method' | 'url'>) => {
    return AppApi.list<IQuestion>({
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
};

export default QuestionApi;
