import React, { useState } from 'react';
import { Modal, Form, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { ModalFuncProps } from 'antd/lib/modal';
import { IAction } from '@/typings/global';
import request from '../../utils/request';

export interface IFormModalOption extends ModalFuncProps {
  defaultFormValues?: any;
  successMsg?: string | null;
  callback?: Function;
}

export interface IFormModalContentProps extends FormComponentProps {
  current: any;
}
export interface IFormModalProps extends FormComponentProps {
  action: IAction | string;
  formModalContentProps: any;
  options: IFormModalOption;
  FormModalContent: React.FC<IFormModalContentProps>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultFormModalContentProps = {
  current: {},
};

const FormModal = Form.create<IFormModalProps>()((props: IFormModalProps) => {
  const {
    form,
    action,
    options,
    FormModalContent,
    visible,
    setVisible,
    formModalContentProps,
  } = props;

  const handleCancel = () => setVisible(false);

  const { defaultFormValues = {}, callback, successMsg = '操作成功！' } = options;

  const handleOk = () => {
    form.validateFields((error, value) => {
      if (error) return;

      if (typeof action === 'string') {
        request(action, {
          method: value.id ? 'PUT' : 'POST',
          data: value,
        });
      } else {
        action({ ...defaultFormValues, ...value })
          .then(data => {
            message.success(successMsg);
            if (callback) callback(data);
          })
          .catch(err => message.error(err));
      }
    });
  };

  return (
    <Modal destroyOnClose onCancel={handleCancel} onOk={handleOk} visible={visible} {...options}>
      <FormModalContent form={form} {...formModalContentProps} />
    </Modal>
  );
});

/**
 * 自动提交表单的弹出框
 * @param ModalContentFC 弹出框的内容组件
 * @param action 提交地址
 * @param opt 弹出框的配置
 */
const useFormModal = (
  FormModalContent: React.FC<any>,
  action: IAction | string,
  opt: IFormModalOption = {},
) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [formModalContentProps, setFormModalContentProps] = useState<any>(
    defaultFormModalContentProps,
  );
  const [options, setOptions] = useState<IFormModalOption>(opt);

  const show = (formModalContentPropsRet = {}, optionsRet: IFormModalOption = {}) => {
    setVisible(true);
    setFormModalContentProps({ ...defaultFormModalContentProps, ...formModalContentPropsRet });
    setOptions({ ...options, ...optionsRet });
  };
  const cancle = () => setVisible(false);

  const render = (): React.ReactNode => (
    <FormModal
      action={action}
      FormModalContent={FormModalContent}
      formModalContentProps={formModalContentProps}
      options={options}
      visible={visible}
      setVisible={setVisible}
    />
  );

  return {
    render,
    cancle,
    show,
  };
};

export default useFormModal;
