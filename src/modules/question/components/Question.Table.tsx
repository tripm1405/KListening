import React from 'react';
import KTs from '@krotohmi/ts';
import { KButton, KFlex, KPagination } from '@krotohmi/react';
import RouterUtil from '~/utils/router.util';
import { QuestionQueryKey } from '~/modules/question/question.constant';
import QuestionApi from '~/modules/question/apis/question.api';
import { IQuestion } from '~/modules/question/question.type';
import { IGroup } from '~/modules/group/group.type';
import KClient, { KTranslation } from '@krotohmi/client';
import TranslationUtil from '~/utils/translation.util';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Table } from 'antd';
import KTanstack from '@krotohmi/tanstack';
import { IKPaginationQuery } from '@krotohmi/api';

interface IProps {
  groupId?: IGroup['id'];
}

const QuestionTable = (props: IProps) => {
  const [pagination, setPagination] = React.useState<IKPaginationQuery>({
    page: 1,
    size: 10,
  });
  const router = useRouter();
  const query = useQueryClient();
  const { onApi } = KClient.useContext();

  const params = React.useMemo(() => {
    return {
      filters: {
        groupId: props.groupId,
      },
      pagination: pagination,
    };
  }, [pagination, props.groupId]);

  const { data } = KTanstack.useApi({
    queryKey: [QuestionQueryKey.List, params],
    queryFn: () =>
      QuestionApi.list({
        params: params,
      }),
  });

  return (
    <KFlex vertical>
      <Table
        dataSource={data?.data?.items}
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
                    const data = await onApi(QuestionApi.del(rowData.id));

                    if (!data.success) return;

                    await query.refetchQueries({
                      queryKey: [QuestionQueryKey.List],
                    });
                  }}
                />
              </KFlex>
            ),
          },
        ]}
      />
      <KPagination
        current={pagination?.page}
        pageSize={pagination?.size}
        total={data?.data?.total}
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
