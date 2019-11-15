import React, { useState } from 'react';
import { Modal, Button } from 'antd';

export interface IUseModalProps {}
interface ModalMethods {
  show: Function;
  cancle: Function;
}

const useFormModal = (ModalContent: React.FC<any>, opt: any): [JSX.Element, ModalMethods] => {
  const [visible, setVisible] = useState<Boolean>(false);
  const [content, setContent] = useState<JSX.Element>();
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

export default useFormModal;
