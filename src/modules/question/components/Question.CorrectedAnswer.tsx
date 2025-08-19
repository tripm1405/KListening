import React, { useMemo } from 'react';
import { KButton, KFlex } from '@krotohmi/k-react';
import { TranslationKey } from '~/utils/translation.util';
import { diffArrays } from 'diff';
import { KTranslation } from 'k-client';

interface IProps {
  getSubmittedAnswer: () => string;
  expectedAnswer: string;
  reAnswer: () => void;
}

const QuestionCorrectedAnswer = ({
  getSubmittedAnswer,
  expectedAnswer,
  reAnswer
}: IProps) => {
  const [transition, setTransition] = React.useState(false);

  const onEnter = React.useCallback(
    (key: KeyboardEvent) => {
      if (key.key === 'Enter') {
        reAnswer();
      }
    },
    [reAnswer],
  );

  React.useEffect(() => {
    window.addEventListener('keypress', onEnter);

    return () => {
      window.removeEventListener('keypress', onEnter);
    };
  }, [onEnter]);

  const diff = useMemo(() => {
    const wordsDiff = diffArrays(
      expectedAnswer.toLowerCase().trim().replace(/\s+/, '* *').split('*'),
      getSubmittedAnswer()
        .toLowerCase()
        .trim()
        .replace(/\s+/, '* *')
        .split('*'),
    );
    const lettersDiff = [];
    for (let i = 0; i < wordsDiff.length; i++) {
      if (wordsDiff[i].removed && wordsDiff[i + 1]?.added) {
        lettersDiff.push(
          ...diffArrays(
            wordsDiff[i].value.join(' ').split(''),
            wordsDiff[i + 1].value.join(' ').split(''),
          ),
        );
        i++;
        continue;
      }
      lettersDiff.push(wordsDiff[i]);
    }
    return lettersDiff;
  }, [getSubmittedAnswer, expectedAnswer]);

  React.useEffect(() => {
    setTimeout(() => {
      setTransition(true);
    }, 200);
  }, []);

  return (
    <KFlex vertical>
      <KFlex>
        <KButton onClick={reAnswer}>
          <KTranslation code={TranslationKey.Question.ReAnswer_Button} />
        </KButton>
      </KFlex>
      <hr />
      <div>
        {diff.map((e, i) =>
          e.value.map((e1, i1) => (
            <span
              key={`${i}-${i1}`}
              style={{
                fontSize: 40,
                ...(e.added || e.removed
                  ? {
                      transition: 'all 1s ease-out',
                      fontSize: transition
                        ? e.added
                          ? 0
                          : 40
                        : e.added
                          ? 40
                          : 0,
                    }
                  : undefined),
                color: e.added ? 'red' : e.removed ? 'black' : 'green',
                fontWeight: 'bold',
              }}
            >
              {e1}
            </span>
          )),
        )}
      </div>
    </KFlex>
  );
};

export default QuestionCorrectedAnswer;
