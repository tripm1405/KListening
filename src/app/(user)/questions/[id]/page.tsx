'use client';

import React from 'react';
import { KButton, KForm, KLoading } from '@krotohmi/react';
import { Form, Input } from 'antd';
import KTs from '@krotohmi/ts';
import { IQuestion } from '~/modules/question/question.type';
import AppTranslationUtil from '~/utils/translation.util';
import KClient, { KTranslation } from '@krotohmi/client';
import KTanstack from '@krotohmi/tanstack';
import { QuestionQueryKey } from '~/modules/question/question.constant';
import QuestionApi from '~/modules/question/apis/question.api';
import { useParams } from 'next/navigation';

const QuestionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { onApi } = KClient.useContext();

  const { data, isLoading } = KTanstack.useApi({
    queryKey: [QuestionQueryKey.Detail, id],
    queryFn: () => QuestionApi.detail(id),
  });

  const onSubmit = async (values: IQuestion) => {
    await onApi(QuestionApi.update(id, {
      data: values,
    }));
  };

  return (
    <KLoading is={isLoading}>
      <KForm initialValues={data?.data} onFinish={onSubmit}>
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
          <KButton htmlType={'submit'}>SUBMIT</KButton>
        </Form.Item>
      </KForm>
    </KLoading>
  );
};

export default QuestionDetailPage;
