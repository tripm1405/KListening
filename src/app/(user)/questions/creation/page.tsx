'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import KClient, { KTranslation, KTranslationKey } from '@krotohmi/client';
import { KButton, KForm } from '@krotohmi/react';
import { Form, Input } from 'antd';
import KTs from '@krotohmi/ts';
import AppTranslationUtil from '~/utils/translation.util';
import { IQuestion } from '~/modules/question/question.type';
import QuestionApi from '~/modules/question/apis/question.api';
import useAppSP from '~/hooks/useAppSP';

const QuestionCreationPage = () => {
  const { groupId } = useAppSP((data) => data);
  const router = useRouter();
  const { handleApi } = KClient.useContext();

  const onSubmit = async (values: IQuestion) => {
    const data = await handleApi(QuestionApi.create({
      data: {
        ...values,
        answer: values.answer.trim().toLowerCase(),
        groupId: groupId,
      },
    }));

    if (!data.success) return;

    router.back();
  };

  return (
    <KForm onFinish={onSubmit}>
      <Form.Item
        name={KTs.nameof<IQuestion>((e) => e.answer)}
        label={<KTranslation code={AppTranslationUtil.genCode<IQuestion>('Question', 'answer')} />}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={KTs.nameof<IQuestion>((e) => e.hint)}
        label={<KTranslation code={AppTranslationUtil.genCode<IQuestion>('Question', 'hint')} />}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <KButton htmlType={'submit'}>{<KTranslation code={KTranslationKey.Save} />}</KButton>
      </Form.Item>
    </KForm>
  );
};

export default QuestionCreationPage;
