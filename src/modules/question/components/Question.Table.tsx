import React from 'react';
import KTs from '@krotohmi/k-ts';
import { KButton, KTable } from '@krotohmi/k-react';
import RouterUtil from '~/utils/router.util';
import { QuestionQueryKey } from '~/modules/question/question.constant';
import { QuestionUrl } from '~/modules/question/question.api';
import { IQuestion } from '~/modules/question/question.type';
import { IGroup } from '~/modules/group/group.type';
import { useKLanguageContext } from 'k-client';
import TranslationUtil from '~/utils/translation.util';
import { useRouter } from 'next/navigation';

interface IProps {
  groupId?: IGroup['id'];
}

const QuestionTable = (props: IProps) => {
  const router = useRouter();
  const { translate } = useKLanguageContext();

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
          render: (rowData: IQuestion) => (
            <>
              <KButton.Detail
                onClick={() =>
                  router.push(RouterUtil.Question.genDetail(rowData.id))
                }
              />
            </>
          ),
        },
      ]}
    />
  );
};

export default QuestionTable;
