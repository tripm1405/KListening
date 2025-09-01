'use client';

import React from 'react';
import { KButton, KForm } from '@krotohmi/react';
import { Form, Input } from 'antd';
import KTs from '@krotohmi/ts';
import { IGroup } from '~/modules/group/group.type';
import AppTranslationUtil from '~/utils/translation.util';
import { useRouter } from 'next/navigation';
import KClient, { KTranslation, KTranslationKey } from '@krotohmi/client';
import GroupApi from '~/modules/group/group.api';
import RouterUtil from '~/utils/router.util';

const GroupCreationPage = () => {
  const router = useRouter();
  const { handleApi } = KClient.useContext();

  const onSubmit = async (values: IGroup) => {
    const data = await handleApi(GroupApi.create({
      data: values,
    }));

    if (!data.success) return;
    if (!data.data) return;

    router.push(RouterUtil.Group.genDetail(data.data));
  };

  return (
    <KForm onFinish={onSubmit}>
      <Form.Item
        name={KTs.nameof<IGroup>((e) => e.name)}
        label={<KTranslation code={AppTranslationUtil.genCode<IGroup>('Group', 'name')} />}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <KButton htmlType={'submit'}>{<KTranslation code={KTranslationKey.Save} />}</KButton>
      </Form.Item>
    </KForm>
  );
};

export default GroupCreationPage;
