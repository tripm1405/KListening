'use client';

import React, { useMemo } from 'react';
import { IQuestion } from '~/modules/question/question.type';
import { Input, InputRef } from 'antd';
import { KButton } from @krotohmi/k-react';
import QuestionCorrectedAnswer from '~/modules/question/components/Question.CorrectedAnswer';
import { useKLanguageContext } from @krotohmi/k-client';
import { TranslationKey } from '~/utils/translation.util';

interface IProps {
  question: IQuestion;
  onNext: () => void;
}

const QuestionPractice = ({ onNext, question }: IProps) => {
  const { translate } = useKLanguageContext();
  const [showHint, setShowHint] = React.useState(false);
  const [showCorrectedAnswer, setShowCorrectedAnswer] = React.useState(false);
  const inputRef = React.useRef<InputRef>(null);

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
      if (inputRef.current?.input) inputRef.current.input.value = '';
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
    <div className={'flex flex-col gap-1'}>
      <div className={'flex gap-1'}>
        <KButton onClick={onSpeak}>
          {translate(TranslationKey.Question.Speak_Button)}
        </KButton>
        <KButton onClick={() => setShowHint(true)}>
          {translate(TranslationKey.Question.Hint_Button)}
        </KButton>
        <KButton onClick={onCheck}>
          {translate(TranslationKey.Question.Check_Button)}
        </KButton>
      </div>
      <hr />
      <Input ref={inputRef} autoComplete="off" />
      <div>{showHint && <div>{question.hint}</div>}</div>
    </div>
  );
};

export default QuestionPractice;
