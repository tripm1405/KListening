import qs from 'qs';
import { IQuestionListParams } from '~/modules/question/apis/question.list.type';

interface IGenUrlProps {
  url: string;
  query?: object;
  slug?: Record<string, string>;
}

function genUrl({ url, query, slug }: IGenUrlProps) {
  let result = slug
    ? Object.keys(slug).reduce((r, c) => {
        return url.replace(c, slug[c]);
      }, url)
    : url;
  if (query) {
    result = `${result}?${qs.stringify(query)}`;
  }

  return result;
}

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
    genPractice: (props?: { query?: IQuestionListParams }) =>
      genUrl({
        ...props,
        url: '/questions/practice',
      }),
  },
};

export default RouterUtil;
