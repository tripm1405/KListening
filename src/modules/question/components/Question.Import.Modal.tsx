import React from 'react';
import { KButton } from '@krotohmi/react';
import { TranslationKey } from '~/utils/translation.util';
import { Modal, Upload, UploadFile } from 'antd';
import KClient from '@krotohmi/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import QuestionApi from '~/modules/question/apis/question.api';
import GroupApi from '~/modules/group/group.api';
import { useQueryClient } from '@tanstack/react-query';
import { QuestionQueryKey } from '~/modules/question/question.constant';

interface IProps {
  groupId?: string;
}

const QuestionImportModal = (props: IProps) => {
  const query = useQueryClient();
  const { onApi, translate } = KClient.useContext();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
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
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          multiple={false}
          accept={'.csv'}
          customRequest={async ({ file }) => {
            const form = new FormData();
            form.set('file', file);

            const config = {
              data: form,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            };
            const data = await onApi(
              props.groupId
                ? GroupApi.importQuestions(props.groupId, config)
                : QuestionApi.import(config),
            ).finally(() => {
              setFileList([]);
            });

            if (!data.success) return;

            setShowImportModal(false);
            await query.refetchQueries({
              queryKey: [QuestionQueryKey.List],
            });
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
