import * as ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Drawer, message, Modal } from 'antd';
import request from '@/utils/request';
import { IAction } from '@/typings/global';
import { ICreateUseRestful } from '@/hooks/createUseRestful/createUseRestful';
import { IFormPopupBoxOption, IFormPopupBoxProps, IUseFormPopupBox } from '../type';

const DrawerFooter = (props: any) => (
  <div
    style={{
      textAlign: 'right',
    }}
  >
    <Button onClick={props.onCancel} style={{ marginRight: 8 }}>
      取消
    </Button>
    <Button onClick={props.onOk} type="primary" loading={props.loading}>
      提交
    </Button>
  </div>
);

const defaultFormPopupBoxContentProps = {
  current: {},
};

const FormPopupBox = Form.create<IFormPopupBoxProps>()((props: IFormPopupBoxProps) => {
  const {
    form,
    action,
    options,
    FormPopupBoxContent,
    visible,
    setVisible,
    formPopupBoxContentProps,
    popupBoxType,
  } = props;

  const CustomPopupBox = popupBoxType === 'Modal' ? Modal : Drawer;

  const handleCancel = () => setVisible(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { defaultFormValues = {}, current = {} } = formPopupBoxContentProps;
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
        // NOTE: 暂时不知道怎么优雅的处理重载 有dalao知道的话帮忙提个pr
      } else if ((action as any).URL) {
        const ret = action as ICreateUseRestful<any>;
        result = method === 'POST' ? ret.create(formValues) : ret.update(formValues.id, formValues);
        ret.mutate(formValues);
        result = result
          .then(data => {
            ret.trigger('query');
            return data;
          })
          .catch(() => setLoading(false));
      } else {
        const ret = (action as any) as IAction;
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

  const defaultProps =
    CustomPopupBox === Drawer
      ? {
          onClose: handleCancel,
          footer: (
            <DrawerFooter onCancel={handleCancel} onOk={handleOk} loading={loading}></DrawerFooter>
          ),
        }
      : {
          onCancel: handleCancel,
          onOk: handleOk,
          footer: [
            <Button key="back" onClick={handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              提交
            </Button>,
          ],
        };

  return (
    <CustomPopupBox
      destroyOnClose
      maskClosable={false}
      visible={visible}
      {...defaultProps}
      {...options}
    >
      <>
        <FormPopupBoxContent form={form} {...formPopupBoxContentProps} />
      </>
    </CustomPopupBox>
  );
});

/**
 * 自动提交表单的弹出框
 * @param ModalContentFC 弹出框的内容组件
 * @param action 提交地址
 * @param opt 弹出框的配置
 */
const useFormPopupBox = (
  FormPopupBoxContent: React.FC<any>,
  action: IAction | string | ICreateUseRestful<any>,
  opt: IFormPopupBoxOption = {},
  popupBoxType: 'Modal' | 'Drawer',
): IUseFormPopupBox => {
  let hasRender = false;
  const [visible, setVisible] = useState<boolean>(false);
  const [formPopupBoxContentProps, setFormPopupBoxContentProps] = useState<any>(
    defaultFormPopupBoxContentProps,
  );
  const [options, setOptions] = useState<IFormPopupBoxOption>(opt);

  const formPopupBoxProps = {
    action,
    options,
    visible,
    setVisible,
    FormPopupBoxContent,
    formPopupBoxContentProps,
    popupBoxType,
  };

  const register = () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(<FormPopupBox {...formPopupBoxProps} />, div);
    return div;
  };

  const destroy = (div: HTMLElement) => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };

  const show = (formPopupBoxContentPropsRet = {}, optionsRet: IFormPopupBoxOption = {}) => {
    setVisible(true);
    setFormPopupBoxContentProps({
      ...defaultFormPopupBoxContentProps,
      ...formPopupBoxContentPropsRet,
    });
    setOptions({ ...options, ...optionsRet });
  };

  const create = (defaultFormValues: any = {}, optionsRet: IFormPopupBoxOption = {}) =>
    show({ defaultFormValues }, optionsRet);

  const edit = (record: any, optionsRet: IFormPopupBoxOption = {}) => {
    show({ current: record }, optionsRet);
  };

  const cancle = () => setVisible(false);

  const render = () => {
    hasRender = true;
    return <FormPopupBox {...formPopupBoxProps} />;
  };

  useEffect(() => {
    if (hasRender) return () => {};
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
    render,
  };
};

export default useFormPopupBox;
