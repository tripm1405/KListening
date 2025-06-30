import qs from 'qs';

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
    genPractice: (groupId?: string) =>
      groupId
        ? `/questions/practice?${qs.stringify({ groupId: groupId })}`
        : '/questions/practice',
  },
};

export default RouterUtil;
