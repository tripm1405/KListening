import React from 'react';
import useAppSelector from '~/redux/hooks/useAppSelector';
import KManagerTranslation from '~/KManagerTranslation';

interface IProps {
  code: string;
}

const KTranslation = ({ code }: IProps) => {
  const { translations } = useAppSelector((e) => e.language);
  const { profile } = useAppSelector((e) => e.identity);

  if (profile?.name === 'kro') {
    return <KManagerTranslation code={code} />;
  }

  return <>{translations?.[code] ?? code}</>;
};

export default KTranslation;
