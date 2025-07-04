'use client';

import React from 'react';
import { useKQuery } from '@krotohmi/k-tanstack';
import { GroupQueryKey } from '~/modules/group/group.constant';
import GroupApi from '~/modules/group/group.api';
import { Flex, Form, Input } from 'antd';
import KTs from '@krotohmi/k-ts';
import { IGroup } from '~/modules/group/group.type';
import AppTranslationUtil, { TranslationKey } from '~/utils/translation.util';
import { KButton, KFlex, KForm, KLoading } from '@krotohmi/k-react';
import {
  KTranslationKey,
  useKClientContext,
  useKLanguageContext,
} from 'k-client';
import RouterUtil from '~/utils/router.util';
import QuestionTable from '~/modules/question/components/Question.Table';
import { useParams, useRouter } from 'next/navigation';
import QuestionImportModal from '~/modules/question/components/Question.Import.Modal';
import { useQueryClient } from '@tanstack/react-query';
import { QuestionQueryKey } from '~/modules/question/question.constant';

const GroupDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const query = useQueryClient();
  const router = useRouter();
  const { translate } = useKLanguageContext();
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
          <KButton
            onClick={() => router.push(RouterUtil.Question.genPractice(id))}
          >
            {translate(TranslationKey.Question.Practise_Button)}
          </KButton>
          <KButton
            onClick={async () => {
              const data = await handleApi(GroupApi.resetStreak(id));
              if (!data.success) return;
              query.refetchQueries({
                queryKey: [QuestionQueryKey.List],
              }).then();
            }}
          >
            {translate(TranslationKey.Question.ResetStreak_Button)}
          </KButton>
        </KFlex>
        <hr />
        <KForm initialValues={data?.result} onFinish={onSubmit}>
          <Form.Item
            name={KTs.nameof<IGroup>((e) => e.name)}
            label={translate(
              AppTranslationUtil.genCode<IGroup>('Group', 'name'),
            )}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <KButton htmlType={'submit'}>
              {translate(KTranslationKey.Save)}
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
