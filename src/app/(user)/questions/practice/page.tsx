'use client';

import React from 'react';
import QuestionPractice from '~/modules/question/components/Question.Practice';
import { useRouter } from 'next/navigation';
import { useKQuery } from '@krotohmi/k-tanstack';
import { QuestionQueryKey } from '~/modules/question/question.constant';
import QuestionApi from '~/modules/question/question.api';
import { KLoading } from '@krotohmi/k-react';

interface IProps {
  searchParams: { groupId: string };
}

const PractisePage = ({ searchParams: { groupId } }: IProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const { data, isLoading } = useKQuery({
    queryKey: [QuestionQueryKey.List, { groupId }],
    queryFn: () =>
      QuestionApi.list({
        params: {
          groupId: groupId,
        },
      }),
  });

  const questions = React.useMemo(() => {
    return data?.result?.items?.sort(() => Math.random() - .5);
  }, [data]);

  React.useEffect(() => {
    if (!data) return;
    if (currentIndex < data?.result?.items.length) return;
    router.push('/');
  }, [router, data, currentIndex]);

  return (
    <KLoading is={isLoading}>
      {questions?.[currentIndex] && (
        <QuestionPractice
          question={questions?.[currentIndex]}
          onNext={() => setCurrentIndex(currentIndex + 1)}
        />
      )}
    </KLoading>
  );
};

export default PractisePage;
