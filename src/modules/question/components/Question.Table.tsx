import React from 'react';
import KTs from '@krotohmi/k-ts';
import { KButton, KFlex, KTable } from '@krotohmi/k-react';
import RouterUtil from '~/utils/router.util';
import { QuestionQueryKey } from '~/modules/question/question.constant';
import QuestionApi, { QuestionUrl } from '~/modules/question/question.api';
import { IQuestion } from '~/modules/question/question.type';
import { IGroup } from '~/modules/group/group.type';
import { useKClientContext, useKLanguageContext } from 'k-client';
import TranslationUtil from '~/utils/translation.util';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

interface IProps {
  groupId?: IGroup['id'];
}

const QuestionTable = (props: IProps) => {
  const router = useRouter();
  const query = useQueryClient();
  const { translate } = useKLanguageContext();
  const { handleApi } = useKClientContext();

  return (
    <KTable.Api<IQuestion>
      query={{
        queryKey: [QuestionQueryKey.List],
      }}
      request={{
        url: QuestionUrl.genList(),
        params: {
          groupId: props.groupId,
        },
      }}
      columns={[
        {
          key: KTs.nameof<IQuestion>((e) => e.answer),
          dataIndex: KTs.nameof<IQuestion>((e) => e.answer),
          title: translate(
            TranslationUtil.genCode<IQuestion>('Question', 'answer'),
          ),
        },
        {
          width: 80,
          render: (rowData: IQuestion) => (
            <KFlex>
              <KButton.Detail
                onClick={() =>
                  router.push(RouterUtil.Question.genDetail(rowData.id))
                }
              />
              <KButton.Delete
                onClick={async () => {
                  const data = await handleApi(QuestionApi.del(rowData.id));

                  if (!data.success) return;

                  await query.refetchQueries({
                    queryKey: [QuestionQueryKey.List],
                  })
                }}
              />
            </KFlex>
          ),
        },
      ]}
    />
  );
};

export default QuestionTable;
