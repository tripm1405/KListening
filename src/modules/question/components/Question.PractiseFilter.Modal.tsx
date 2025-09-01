import React from 'react';
import { KButton } from '@krotohmi/react';
import { Form, Input, Modal } from 'antd';
import { TranslationKey } from '~/utils/translation.util';
import { KTranslation } from '@krotohmi/client';
import { useRouter } from 'next/navigation';
import KTs from '@krotohmi/ts';
import { IQuestionListParams } from '~/modules/question/apis/question.list.type';
import RouterUtil from '~/utils/router.util';

interface IProps {
  groupId: string;
  streak?: {
    min?: number;
    max?: number;
  };
}

const QuestionPractiseFilterModal = (props: IProps) => {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [form] = Form.useForm();
  const min = Form.useWatch(KTs.nameof<IQuestionListParams['filters']>(
    (e) => e.streak.min,
    { isFull: true },
  ).split('.'), form);
  const max = Form.useWatch(KTs.nameof<IQuestionListParams['filters']>(
    (e) => e.streak.max,
    { isFull: true },
  ).split('.'), form);

  React.useEffect(() => {
    if (max < min) {
      form.setFieldValue(KTs.nameof<IQuestionListParams['filters']>(
        (e) => e.streak.max,
        { isFull: true },
      ).split('.'), min);
    }
  }, [form, min]);
  React.useEffect(() => {
    if (min > max) {
      form.setFieldValue(KTs.nameof<IQuestionListParams['filters']>(
        (e) => e.streak.min,
        { isFull: true },
      ).split('.'), max);
    }
  }, [form, max]);

  const onClose = React.useCallback(() => setShow(false), [setShow]);

  const onSubmit = React.useCallback(
    (values: IQuestionListParams['filters']) => {
      router.push(
        RouterUtil.Question.genPractice({
          query: {
            ...values,
            groupId: props.groupId,
          },
        }),
      );
    },
    [props.groupId, router],
  );

  return (
    <>
      <KButton onClick={() => setShow(true)}>
        <KTranslation code={TranslationKey.Question.Practise_Button} />
      </KButton>
      <Modal
        title={<KTranslation code={TranslationKey.Question.Import_Modal} />}
        open={show}
        onOk={() => form.submit()}
        onCancel={onClose}
      >
        <Form
          form={form}
          onFinish={onSubmit}
          initialValues={
            {
              streak: { min: 0, max: 1, ...props.streak },
            } as IQuestionListParams['filters']
          }
        >
          <Form.Item
            name={KTs.nameof<IQuestionListParams['filters']>(
              (e) => e.streak.min,
              { isFull: true },
            ).split('.')}
            label={<KTranslation code={'Min'} />}
          >
            <Input type={'number'} min={0} />
          </Form.Item>
          <Form.Item
            name={KTs.nameof<IQuestionListParams['filters']>(
              (e) => e.streak.max,
              { isFull: true },
            ).split('.')}
            label={<KTranslation code={'Max'} />}
          >
            <Input type={'number'} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default QuestionPractiseFilterModal;
