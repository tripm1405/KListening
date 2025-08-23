'use client';

import React, { useMemo } from 'react';
import { IQuestion } from '~/modules/question/question.type';
import { Button, Form, Input, InputRef } from 'antd';
import { KButton, KFlex } from '@krotohmi/k-react';
import QuestionCorrectedAnswer from '~/modules/question/components/Question.CorrectedAnswer';
import { getUUID } from 'rc-select/es/hooks/useId';
import { FormRef } from 'rc-field-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faLightbulb,
  faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import QuestionApi from '~/modules/question/apis/question.api';

const InputName = String(getUUID());

interface IProps {
  question: IQuestion;
  onNext: () => void;
}

const QuestionPractice = ({ onNext, question }: IProps) => {
  const [showHint, setShowHint] = React.useState(false);
  const [showCorrectedAnswer, setShowCorrectedAnswer] = React.useState(false);
  const inputRef = React.useRef<InputRef>(null);
  const formRef = React.useRef<FormRef>(null);

  const utterance = useMemo(() => {
    const preSpeak = new SpeechSynthesisUtterance(' ');
    preSpeak.lang = 'en-US';
    preSpeak.onend = () => {
      const utterance = new SpeechSynthesisUtterance(`${question.answer}`);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    };
    return preSpeak;
  }, [question]);

  const onCheck = React.useCallback(() => {
    const userAnswer = formRef.current?.getFieldValue(InputName)?.toLowerCase()?.trim();
    const correctedAnswer = question.answer.toLowerCase().trim();

    if (userAnswer === correctedAnswer) {
      setShowHint(false);
      setShowCorrectedAnswer(false);
      QuestionApi.increaseStreak(question.id).then();
      formRef.current?.setFieldValue(InputName, '');
      onNext();
      return;
    }
    QuestionApi.resetStreak(question.id).then();
    setShowCorrectedAnswer(true);
  }, [onNext, question]);

  const onSpeak = React.useCallback(() => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [utterance]);

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        onCheck();
      }
    },
    [onCheck],
  );

  React.useEffect(() => {
    onSpeak();
  }, [question, onSpeak]);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef, showHint, showCorrectedAnswer]);

  React.useEffect(() => {
    window.removeEventListener('keydown', onKeyDown);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  if (showCorrectedAnswer) {
    return (
      <QuestionCorrectedAnswer
        expectedAnswer={question.answer.toLowerCase().trim()}
        getSubmittedAnswer={() =>
          inputRef.current?.input?.value.toLowerCase().trim() || ''
        }
        reAnswer={() => {
          setShowCorrectedAnswer(false);
          onSpeak();
        }}
      />
    );
  }

  return (
    <KFlex vertical>
      <KFlex>
        <KButton
          icon={<FontAwesomeIcon icon={faVolumeHigh} />}
          onClick={onSpeak}
        />
        <KButton
          icon={<FontAwesomeIcon icon={faLightbulb} />}
          onClick={() => setShowHint(true)}
        />
        <KButton icon={<FontAwesomeIcon icon={faCheck} />} onClick={onCheck} />
      </KFlex>
      <hr />
      <KFlex vertical>
        <div>Streak: {question.streak}</div>
        <Form ref={formRef}>
          <Form.Item name={String(getUUID())}>
            <Input ref={inputRef} autoComplete="off" />
          </Form.Item>
        </Form>
        <div>{showHint && <div>{question.hint}</div>}</div>
      </KFlex>
    </KFlex>
  );
};

export default QuestionPractice;
