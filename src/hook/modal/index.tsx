import React, { useState } from 'react';
import { Modal, Button } from 'antd';

export interface IUseModalProps {}

const useModal = (ModalContent: any, opt: any): [JSX.Element, any] => {
  const [visible, setVisible] = useState<Boolean>(false);
  const [content, setContent] = useState<React.ReactElement>();
  const [options, setOptions] = useState<any>(opt);

  const methods = {
    show: (contentRet: React.ReactElement, optionsRet = {}) => {
      setVisible(true);
      setContent(contentRet);
      setOptions({ ...options, ...optionsRet });
    },
    cancle: () => setVisible(false),
  };

  const handleCancel = () => setVisible(false);

  const handleOk = () => setVisible(false);

  const CustomModal = (
    <Modal
      destroyOnClose
      closable={false}
      onCancel={handleCancel}
      onOk={handleOk}
      visible={visible}
      footer={
        <Button onClick={handleCancel} type="primary">
          好的，知道了
        </Button>
      }
      {...options}
    >
      <ModalContent {...content} />
    </Modal>
  );
  return [CustomModal, methods];
};

export default useModal;