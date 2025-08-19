'use client';

import React from 'react';
import { useKQuery } from '@krotohmi/k-tanstack';
import { GroupQueryKey } from '~/modules/group/group.constant';
import GroupApi from '~/modules/group/group.api';
import { Form, Input } from 'antd';
import KTs from '@krotohmi/k-ts';
import { IGroup } from '~/modules/group/group.type';
import AppTranslationUtil, { TranslationKey } from '~/utils/translation.util';
import { KButton, KFlex, KForm, KLoading } from '@krotohmi/k-react';
import {
  KTranslation,
  KTranslationKey,
  useKClientContext,
} from 'k-client';
import RouterUtil from '~/utils/router.util';
import QuestionTable from '~/modules/question/components/Question.Table';
import { useParams, useRouter } from 'next/navigation';
import QuestionImportModal from '~/modules/question/components/Question.Import.Modal';
import { useQueryClient } from '@tanstack/react-query';
import { QuestionQueryKey } from '~/modules/question/question.constant';
import QuestionPractiseFilterModal from '~/modules/question/components/Question.PractiseFilter.Modal';

const GroupDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const query = useQueryClient();
  const router = useRouter();
  const { handleApi } = useKClientContext();

  const { data, isFetching } = useKQuery({
    queryKey: [GroupQueryKey.Detail, id],
    queryFn: () => GroupApi.detail(id),
  });

  const onSubmit = async (values: IGroup) => {
    await handleApi(GroupApi.update(id, { data: values }));
  };

  return (
    <KLoading is={isFetching}>
      <KFlex vertical>
        <KFlex>
          <QuestionPractiseFilterModal groupId={id} />
          <KButton
            onClick={async () => {
              const data = await handleApi(GroupApi.resetStreak(id));
              if (!data.success) return;
              query
                .refetchQueries({
                  queryKey: [QuestionQueryKey.List],
                })
                .then();
            }}
          >
            <KTranslation code={TranslationKey.Question.ResetStreak_Button} />
          </KButton>
        </KFlex>
        <hr />
        <KForm initialValues={data?.result} onFinish={onSubmit}>
          <Form.Item
            name={KTs.nameof<IGroup>((e) => e.name)}
            label={<KTranslation code={AppTranslationUtil.genCode<IGroup>('Group', 'name')} />}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <KButton htmlType={'submit'}>
              <KTranslation code={KTranslationKey.Save} />
            </KButton>
          </Form.Item>
        </KForm>
        <hr />
        <KFlex vertical>
          <KFlex>
            <KButton.Create
              onClick={() => router.push(RouterUtil.Question.genCreation(id))}
            />
            <QuestionImportModal groupId={id} />
          </KFlex>
          <QuestionTable groupId={id} />
        </KFlex>
      </KFlex>
    </KLoading>
  );
};

export default GroupDetailPage;
