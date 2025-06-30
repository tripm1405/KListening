'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { KTranslationKey, useKLanguageContext } from @krotohmi/k-client';
import { KButton, KForm } from @krotohmi/k-react';
import { Form, Input } from 'antd';
import KTs from @krotohmi/k-ts';
import AppTranslationUtil from '~/utils/translation.util';
import { IQuestion } from '~/modules/question/question.type';
import QuestionApi from '~/modules/question/question.api';

interface IProps {
  searchParams: { groupId?: string };
}

const QuestionCreationPage = ({ searchParams: { groupId } }: IProps) => {
  const router = useRouter();
  const { translate } = useKLanguageContext();

  const onSubmit = async (values: IQuestion) => {
    await QuestionApi.create({
      data: {
        ...values,
        answer: values.answer.trim().toLowerCase(),
        groupId: groupId,
      },
    });

    router.back();
  };

  return (
    <KForm onFinish={onSubmit}>
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
        <KButton htmlType={'submit'}>{translate(KTranslationKey.Save)}</KButton>
      </Form.Item>
    </KForm>
  );
};

export default QuestionCreationPage;
