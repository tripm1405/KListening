import React from 'react';
import KTs from '@krotohmi/k-ts';
import { KButton, KFlex, KPagination } from '@krotohmi/k-react';
import RouterUtil from '~/utils/router.util';
import { QuestionQueryKey } from '~/modules/question/question.constant';
import QuestionApi from '~/modules/question/apis/question.api';
import { IQuestion } from '~/modules/question/question.type';
import { IGroup } from '~/modules/group/group.type';
import { KTranslation, useKClientContext } from 'k-client';
import TranslationUtil from '~/utils/translation.util';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Table } from 'antd';
import { IKListPaginationParams, KListPaginationParams } from '@krotohmi/k-api';
import { useKListQuery } from '@krotohmi/k-tanstack';

interface IProps {
  groupId?: IGroup['id'];
}

const QuestionTable = (props: IProps) => {
  const [pagination, setPagination] = React.useState<IKListPaginationParams>(
    KListPaginationParams,
  );
  const router = useRouter();
  const query = useQueryClient();
  const { handleApi } = useKClientContext();

  const params = React.useMemo(() => {
    return {
      filters: {
        groupId: props.groupId,
      },
      pagination: pagination,
    };
  }, [pagination, props.groupId]);

  const { data } = useKListQuery({
    queryKey: [QuestionQueryKey.List, params],
    queryFn: () =>
      QuestionApi.list({
        params: params,
      }),
  });

  return (
    <KFlex vertical>
      <Table
        dataSource={data?.result?.items}
        key={'id'}
        columns={[
          {
            key: KTs.nameof<IQuestion>((e) => e.answer),
            dataIndex: KTs.nameof<IQuestion>((e) => e.answer),
            title: (
              <KTranslation
                code={TranslationUtil.genCode<IQuestion>('Question', 'answer')}
              />
            ),
          },
          {
            key: KTs.nameof<IQuestion>((e) => e.streak),
            dataIndex: KTs.nameof<IQuestion>((e) => e.streak),
            title: (
              <KTranslation
                code={TranslationUtil.genCode<IQuestion>('Question', 'streak')}
              />
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
                    });
                  }}
                />
              </KFlex>
            ),
          },
        ]} />
      <KPagination
        current={data?.result?.page}
        pageSize={data?.result?.size}
        total={data?.result?.total}
        onChange={(page: number, size: number) => {
          setPagination({
            page: page,
            size: size,
          });
        }}
      />
    </KFlex>
  );
};

export default QuestionTable;
