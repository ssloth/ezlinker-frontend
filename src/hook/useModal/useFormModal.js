import { useState } from 'react';
import { Modal, Form, message } from 'antd';
import { connect } from 'dva';

const FormModal = connect()(
  Form.create()(props => {
    const {
      form,
      options,
      dispatch,
      ModalContent,
      dispatchType,
      visible,
      setVisible,
      content,
      successText = '操作成功',
    } = props;

    const handleCancel = () => setVisible(false);

    const { defaultFormValues = {}, callback } = options;

    const handleOk = () => {
      form.validateFields((error, value) => {
        if (error) return;
        dispatch({
          type: dispatchType,
          payload: { ...defaultFormValues, ...value },
        }).then(res => {
          if (res) message.success(successText);
          setVisible(false);
          if (typeof callback === 'function') callback();
        });
      });
    };

    return (
      <Modal
        destroyOnClose
        onCancel={handleCancel}
        onOk={handleOk}
        visible={visible}
        {...options}
      >
        <ModalContent {...props} {...content} />
      </Modal>
    );
  })
);

export default function(ModalContent, dispatchType, opt = {}) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(false);
  const [options, setOptions] = useState(opt);

  const methods = {
    show: (contentRet, optionsRet = {}) => {
      setVisible(true);
      setContent(contentRet);
      setOptions({ ...options, ...optionsRet });
    },
    cancle: () => setVisible(false),
    update: (contentRet, optionsRet = {}) => {
      setVisible(true);
      setContent(contentRet);
      setOptions({ ...options, ...optionsRet });
    },
  };

  const CustomModal = (
    <FormModal
      options={options}
      dispatchType={dispatchType}
      visible={visible}
      setVisible={setVisible}
      content={content}
      ModalContent={ModalContent}
      setContent={content}
    />
  );

  return [CustomModal, methods];
}
