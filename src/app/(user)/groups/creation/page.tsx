'use client';

import React from 'react';
import { KButton, KForm } from '@krotohmi/k-react';
import { Form, Input } from 'antd';
import KTs from '@krotohmi/k-ts';
import { IGroup } from '~/modules/group/group.type';
import AppTranslationUtil from '~/utils/translation.util';
import { useRouter } from 'next/navigation';
import { useKLanguageContext, KTranslationKey, useKClientContext } from 'k-client';
import GroupApi from '~/modules/group/group.api';
import RouterUtil from '~/utils/router.util';

const GroupCreationPage = () => {
  const router = useRouter();
  const { translate } = useKLanguageContext();
  const { handleApi } = useKClientContext();

  const onSubmit = async (values: IGroup) => {
    const data = await handleApi(GroupApi.create({
      data: values,
    }));

    if (!data.success) return;

    router.push(RouterUtil.Group.genDetail(data.result));
  };

  return (
    <KForm onFinish={onSubmit}>
      <Form.Item
        name={KTs.nameof<IGroup>((e) => e.name)}
        label={translate(AppTranslationUtil.genCode<IGroup>('Group', 'name'))}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <KButton htmlType={'submit'}>{translate(KTranslationKey.Save)}</KButton>
      </Form.Item>
    </KForm>
  );
};

export default GroupCreationPage;
