'use client';

import React, { useMemo } from 'react';
import { IQuestion } from '~/modules/question/question.type';
import { Form, Input, InputRef } from 'antd';
import { KButton, KFlex } from '@krotohmi/k-react';
import QuestionCorrectedAnswer from '~/modules/question/components/Question.CorrectedAnswer';
import { useKLanguageContext } from 'k-client';
import { TranslationKey } from '~/utils/translation.util';
import { getUUID } from 'rc-select/es/hooks/useId';
import { FormRef } from 'rc-field-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faQuestion, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

const InputName = String(getUUID());

interface IProps {
  question: IQuestion;
  onNext: () => void;
}

const QuestionPractice = ({ onNext, question }: IProps) => {
  const { translate } = useKLanguageContext();
  const [showHint, setShowHint] = React.useState(false);
  const [showCorrectedAnswer, setShowCorrectedAnswer] = React.useState(false);
  const inputRef = React.useRef<InputRef>(null);
  const formRef = React.useRef<FormRef>(null);

  const utterance = useMemo(() => {
    const preSpeak = new SpeechSynthesisUtterance(' ');
    preSpeak.lang = 'en-US';
    preSpeak.onend = () => {
      const utterance = new SpeechSynthesisUtterance(`\u00A0 \u00A0 ... ${question.answer}`);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    };
    return preSpeak;
  }, [question]);

  const onCheck = React.useCallback(() => {
    const userAnswer = inputRef.current?.input?.value.toLowerCase().trim();
    const correctedAnswer = question.answer.toLowerCase().trim();

    if (userAnswer === correctedAnswer) {
      setShowHint(false);
      setShowCorrectedAnswer(false);
      formRef.current?.setFieldValue(InputName, '');
      onNext();
      return;
    }
    setShowCorrectedAnswer(true);
  }, [onNext, question.answer]);

  const onEnter = React.useCallback(
    (key: KeyboardEvent) => {
      if (key.key === 'Enter') {
        onCheck();
      }
    },
    [onCheck],
  );

  const onSpeak = React.useCallback(() => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [utterance]);

  React.useEffect(() => {
    onSpeak();
  }, [question, onSpeak]);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef, showHint, showCorrectedAnswer]);

  React.useEffect(() => {
    window.addEventListener('keypress', onEnter);

    return () => {
      window.removeEventListener('keypress', onEnter);
    };
  }, [onEnter]);

  if (showCorrectedAnswer) {
    return (
      <QuestionCorrectedAnswer
        expectedAnswer={question.answer.toLowerCase().trim()}
        getSubmittedAnswer={() =>
          inputRef.current?.input?.value.toLowerCase().trim() || ''
        }
        reAnswer={() => setShowCorrectedAnswer(false)}
      />
    );
  }

  return (
    <KFlex vertical>
      <KFlex>
        <KButton icon={<FontAwesomeIcon icon={faVolumeHigh} />} onClick={onSpeak} />
        <KButton icon={<FontAwesomeIcon icon={faQuestion} />} onClick={() => setShowHint(true)} />
        <KButton icon={<FontAwesomeIcon icon={faCheck} />} onClick={onCheck} />
      </KFlex>
      <hr />
      <Form ref={formRef}>
        <Form.Item name={String(getUUID())}>
          <Input ref={inputRef} autoComplete="off" />
        </Form.Item>
      </Form>
      <div>{showHint && <div>{question.hint}</div>}</div>
    </KFlex>
  );
};

export default QuestionPractice;
