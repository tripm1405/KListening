'use client';

import React from 'react';
import { KButton, KForm, KLoading } from '@krotohmi/k-react';
import { Form, Input } from 'antd';
import KTs from '@krotohmi/k-ts';
import { IQuestion } from '~/modules/question/question.type';
import AppTranslationUtil from '~/utils/translation.util';
import { useKClientContext, useKLanguageContext } from 'k-client';
import { useKQuery } from '@krotohmi/k-tanstack';
import { QuestionQueryKey } from '~/modules/question/question.constant';
import QuestionApi from '~/modules/question/question.api';
import { useParams } from 'next/navigation';

const QuestionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { translate } = useKLanguageContext();
  const { handleApi } = useKClientContext();

  const { data, isLoading } = useKQuery({
    queryKey: [QuestionQueryKey.Detail, id],
    queryFn: () => QuestionApi.detail(id),
  });

  const onSubmit = async (values: IQuestion) => {
    await handleApi(QuestionApi.update(id, {
      data: values,
    }));
  };

  return (
    <KLoading is={isLoading}>
      <KForm initialValues={data?.result} onFinish={onSubmit}>
        <Form.Item
          name={KTs.nameof<IQuestion>((e) => e.answer)}
          label={translate(
            AppTranslationUtil.genCode<IQuestion>('Question', 'answer'),
          )}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={KTs.nameof<IQuestion>((e) => e.hint)}
          label={translate(
            AppTranslationUtil.genCode<IQuestion>('Question', 'hint'),
          )}
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
