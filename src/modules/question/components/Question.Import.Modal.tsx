import React from 'react';
import { KButton } from '@krotohmi/k-react';
import { TranslationKey } from '~/utils/translation.util';
import { Modal, Upload } from 'antd';
import { useKLanguageContext } from 'k-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { KApiUtil } from '@krotohmi/k-api';
import QuestionApi from '~/modules/question/question.api';
import GroupApi from '~/modules/group/group.api';

interface IProps {
  groupId?: string;
}

const QuestionImportModal = (props: IProps) => {
  const { translate } = useKLanguageContext();
  const [showImportModal, setShowImportModal] = React.useState(false);

  return (
    <>
      <KButton.Import onClick={() => setShowImportModal(true)} />
      <Modal
        title={translate(TranslationKey.Question.Import_Modal)}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={showImportModal}
        onOk={() => setShowImportModal(false)}
        onCancel={() => setShowImportModal(false)}
      >
        <Upload.Dragger
          multiple={false}
          accept={'.csv'}
          customRequest={async ({ file }) => {
            if (props.groupId) {
              await GroupApi.importQuestions(props.groupId, {
                data: KApiUtil.genFormData({
                  data: {
                    file: file,
                  },
                }),
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
            }
            else {
              await QuestionApi.import({
                data: KApiUtil.genFormData({
                  data: {
                    file: file,
                  },
                }),
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
            }
            setShowImportModal(false);
          }}
        >
          <div>
            <div>
              <FontAwesomeIcon size={'2xl'} icon={faInbox} />
            </div>
            {translate('K_Drag')}
          </div>
        </Upload.Dragger>
      </Modal>
    </>
  );
};

export default QuestionImportModal;
