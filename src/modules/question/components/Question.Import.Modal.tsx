import React from 'react';
import { KButton } from '@krotohmi/k-react';
import { TranslationKey } from '~/utils/translation.util';
import { Modal, Upload, UploadFile } from 'antd';
import { useKClientContext, useKLanguageContext } from 'k-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { KApiUtil } from '@krotohmi/k-api';
import QuestionApi from '~/modules/question/question.api';
import GroupApi from '~/modules/group/group.api';
import { useQueryClient } from '@tanstack/react-query';
import { QuestionQueryKey } from '~/modules/question/question.constant';

interface IProps {
  groupId?: string;
}

const QuestionImportModal = (props: IProps) => {
  const query = useQueryClient();
  const { translate } = useKLanguageContext();
  const { handleApi } = useKClientContext();
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
            const config = {
              data: KApiUtil.genFormData({
                data: {
                  file: file,
                },
              }),
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            };
            const data = await handleApi(
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
