import React from 'react';
import useAppSelector from '~/redux/hooks/useAppSelector';
import { Dropdown } from 'antd';
import KTranslationContextMenu from '~/KTranslation.ContextMenu';

interface IProps {
  code: string;
}

const KManagerTranslation = ({ code }: IProps) => {
  const { translations } = useAppSelector((e) => e.language);

  return (
    <Dropdown
      popupRender={() => <KTranslationContextMenu />}
      trigger={['contextMenu']}
    >
      <div title={code}>
        {translations?.[code] ?? code}
      </div>
    </Dropdown>
  );
};

export default KManagerTranslation;
