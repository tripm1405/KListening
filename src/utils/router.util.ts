import { KApiUtil } from '@krotohmi/k-api';
import qs from 'qs';
import { IQuestionListParams } from '~/modules/question/apis/question.list.type';

function genDefaultCollectRoute(pre: string) {
  return {
    genList: () => `/${pre}`,
    genDetail: (id: string) => `/${pre}/${id}`,
    genCreation: () => `/${pre}/creation`,
  };
}

const RouterUtil = {
  genHome: () => '/',
  genSignIn: () => '/sign-in',
  Group: genDefaultCollectRoute('groups'),
  Question: {
    ...genDefaultCollectRoute('questions'),
    genCreation: (groupId?: string) =>
      groupId
        ? `/questions/creation?${qs.stringify({ groupId: groupId })}`
        : '/questions/creation',
    genPractice: (props?: { query?: IQuestionListParams }) => KApiUtil.genUrl({
      ...props,
      url: '/questions/practice',
    }),
  },
};

export default RouterUtil;
