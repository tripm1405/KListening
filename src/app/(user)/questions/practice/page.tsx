'use client';

import React from 'react';
import QuestionPractice from '~/modules/question/components/Question.Practice';
import { useRouter } from 'next/navigation';
import { useKQuery } from '@krotohmi/k-tanstack';
import { QuestionQueryKey } from '~/modules/question/question.constant';
import QuestionApi from '~/modules/question/apis/question.api';
import { KLoading } from '@krotohmi/k-react';
import useAppSP from '~/hooks/useAppSP';
import RouterUtil from '~/utils/router.util';
import { IQuestionListParams } from '~/modules/question/apis/question.list.type';
import KTs from '@krotohmi/k-ts';

const PractisePage = () => {
  const query = useAppSP<NonNullable<IQuestionListParams['filters']>>(
    (data) => ({
      groupId: data.groupId || '',
      streak: {
        min: Number(data.streak?.min ?? 1),
        max: Number(data.streak?.max ?? 1),
      },
    }),
  );
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const { data, isLoading } = useKQuery({
    queryKey: [QuestionQueryKey.List, query],
    queryFn: () =>
      QuestionApi.list({
        params: {
          filters: query,
        },
      }),
  });

  const questions = React.useMemo(() => {
    const questionOlds = data?.result?.items?.filter((e) => e.streak > 0) || [];
    const newAmount = Math.floor(questionOlds.length / 3);
    const questionNews =
      data?.result?.items?.filter((e) => e.streak === 0) || [];
    return [
      ...KTs.shuffle([...questionOlds, ...questionNews.slice(0, newAmount)]),
      ...questionNews.slice(newAmount),
    ];
  }, [data]);
  const question = React.useMemo(() => {
    return questions?.[currentIndex];
  }, [questions, currentIndex]);

  const onNext = React.useCallback(
    () => setCurrentIndex((i) => i + 1),
    [setCurrentIndex],
  );

  React.useEffect(() => {
    if (!data) return;
    if (currentIndex < data?.result?.items.length) return;
    if (query?.groupId) {
      router.push(RouterUtil.Group.genDetail(query.groupId));
    }
  }, [router, data, currentIndex, query?.groupId]);

  return (
    <KLoading is={isLoading}>
      {question && <QuestionPractice question={question} onNext={onNext} />}
    </KLoading>
  );
};

export default PractisePage;
