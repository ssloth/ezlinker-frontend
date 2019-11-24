import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Modal, Form, message, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { ModalProps } from 'antd/lib/modal';
import { IAction } from '@/typings/global';
import request from '../../utils/request';
import { IUseResuful } from '../useRestful/useRestful';

export interface IFormModalOption extends ModalProps {
  defaultFormValues?: any;
  successMsg?: string | null;
  callback?: Function;
}

export interface IFormModalContentProps extends FormComponentProps {
  current?: any;
  defaultFormValues?: any;
}
export interface IFormModalProps extends FormComponentProps {
  action: IAction | string | IUseResuful<any>;
  formModalContentProps: any;
  options: IFormModalOption;
  FormModalContent: React.FC<IFormModalContentProps>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUseFormModal {
  show: (formModalContentProps?: any, options?: any) => any;
  create: (defaultFormValues: any) => any;
  edit: (record: any) => any;
  cancle: () => any;
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
  const [loading, setLoading] = useState<boolean>(false);
  const { defaultFormValues = {}, current = {} } = formModalContentProps;
  const { callback, successMsg = '操作成功！' } = options;

  const handleOk = () => {
    form.validateFields((error, value) => {
      if (error) return;
      const formValues = { ...defaultFormValues, ...current, ...value };
      setLoading(true);

      const method = current.id ? 'PUT' : 'POST';
      let result;
      if (typeof action === 'string') {
        result = request(action, {
          method,
          data: formValues,
        });
      } else if ((action as any).URL) {
        const ret = action as IUseResuful<any>;
        result = method === 'POST' ? ret.create(formValues) : ret.update(formValues.id, formValues);
        ret.mutate(formValues);
        result = result
          .then(data => {
            ret.trigger('query');
            return data;
          })
          .catch(() => setLoading(false));
      } else {
        const ret = action as IAction;
        result = ret(formValues);
      }
      result
        .then(data => {
          handleCancel();
          message.success(successMsg);
          if (callback) callback(data);
        })
        // .catch(err =>  message.error(err)) // 业务层不处理错误
        .finally(() => setLoading(false));
    });
  };

  return (
    <Modal
      destroyOnClose
      onCancel={handleCancel}
      onOk={handleOk}
      visible={visible}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          提交
        </Button>,
      ]}
      {...options}
    >
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
  action: IUseResuful<any> | IAction | string,
  opt: IFormModalOption = {},
): IUseFormModal => {
  const [visible, setVisible] = useState<boolean>(false);
  const [formModalContentProps, setFormModalContentProps] = useState<any>(
    defaultFormModalContentProps,
  );
  const [options, setOptions] = useState<IFormModalOption>(opt);

  const register = () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const props = { action, FormModalContent, formModalContentProps, options, visible, setVisible };
    ReactDOM.render(<FormModal {...props} />, div);
    return div;
  };

  const destroy = (div: HTMLElement) => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };

  const show = (formModalContentPropsRet = {}, optionsRet: IFormModalOption = {}) => {
    setVisible(true);
    setFormModalContentProps({ ...defaultFormModalContentProps, ...formModalContentPropsRet });
    setOptions({ ...options, ...optionsRet });
  };

  const create = (defaultFormValues: any = {}) => show({ defaultFormValues });

  const edit = (record: any, optionsRet: IFormModalOption = {}) => {
    show({ current: record }, optionsRet);
  };

  const cancle = () => setVisible(false);

  useEffect(() => {
    const container = register();
    return () => {
      destroy(container);
    };
  }, [visible]);

  return {
    cancle,
    show,
    create,
    edit,
  };
};

export default useFormModal;
