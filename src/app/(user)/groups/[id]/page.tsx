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
import { KTranslationKey, useKLanguageContext } from 'k-client';
import RouterUtil from '~/utils/router.util';
import QuestionTable from '~/modules/question/components/Question.Table';
import { useRouter } from 'next/navigation';
import QuestionImportModal from '~/modules/question/components/Question.Import.Modal';

interface IProps {
  params: { id: string };
}

const GroupDetailPage = ({ params: { id } }: IProps) => {
  const router = useRouter();
  const { translate } = useKLanguageContext();

  const { data, isFetching } = useKQuery({
    queryKey: [GroupQueryKey.Detail, id],
    queryFn: () => GroupApi.detail(id),
  });

  const onSubmit = async (values: IGroup) => {
    await GroupApi.update(id, { data: values });
  };

  return (
    <KLoading is={isFetching}>
      <KFlex vertical>
        <Flex>
          <KButton
            onClick={() => router.push(RouterUtil.Question.genPractice(id))}
          >
            {translate(TranslationKey.Question.Practise_Button)}
          </KButton>
        </Flex>
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
