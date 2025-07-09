'use client';

import React from 'react';
import QuestionPractice from '~/modules/question/components/Question.Practice';
import { useRouter } from 'next/navigation';
import { useKQuery } from '@krotohmi/k-tanstack';
import {
  Question_SteakMaximum,
  QuestionQueryKey,
} from '~/modules/question/question.constant';
import QuestionApi from '~/modules/question/question.api';
import { KLoading } from '@krotohmi/k-react';
import useAppSP from '~/hooks/useAppSP';
import RouterUtil from '~/utils/router.util';

const PractisePage = () => {
  const { groupId } = useAppSP({ groupId: undefined });
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const { data, isLoading } = useKQuery({
    queryKey: [QuestionQueryKey.List, { groupId }],
    queryFn: () =>
      QuestionApi.list({
        params: {
          groupId: groupId,
          streak: Question_SteakMaximum,
        },
      }),
  });

  const questions = React.useMemo(() => {
    // ToDo: KTs: shuffle
    const questionOlds = data?.result?.items?.filter(e => e.streak === 1) || [];
    const newAmount = Math.floor(questionOlds.length/3);
    const questionNews = data?.result?.items?.filter(e => e.streak === 0) || [];
    return [...[...questionOlds, ...questionNews.slice(0, newAmount)].sort(() => Math.random() - 0.5), ...questionNews.slice(newAmount)];
  }, [data]);
  const question = React.useMemo(() => {
    return questions?.[currentIndex];
  }, [questions, currentIndex]);

  React.useEffect(() => {
    if (!data) return;
    if (currentIndex < data?.result?.items.length) return;
    if (groupId) {
      router.push(RouterUtil.Group.genDetail(groupId));
    }
  }, [router, data, currentIndex, groupId]);

  return (
    <KLoading is={isLoading}>
      {question && (
        <QuestionPractice
          question={question}
          onNext={() => setCurrentIndex(currentIndex + 1)}
        />
      )}
    </KLoading>
  );
};

export default PractisePage;
