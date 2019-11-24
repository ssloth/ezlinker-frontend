import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Drawer } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';

export interface IUseDrawer {
  show: (contentProps?: any, drawerProps?: DrawerProps) => any;
  cancle: () => any;
}

/**
 * 自动提交表单的弹出框
 * @param ModalContentFC 弹出框的内容组件
 * @param action 提交地址
 * @param opt 弹出框的配置
 */

const useDrawer = (Content: React.FC<any>, drawerPropsDefault: DrawerProps = {}): IUseDrawer => {
  const [visible, setVisible] = useState<boolean>(false);
  const [contentProps, setContentProps] = useState<any>({});
  const [drawerProps, setDrawerProps] = useState<DrawerProps>(drawerPropsDefault);

  const show = (contentPropsArg?: any, drawerPropsArg?: DrawerProps) => {
    setVisible(true);
    if (contentPropsArg) setContentProps({ ...contentProps, ...contentPropsArg });
    if (drawerPropsArg) setDrawerProps({ ...drawerProps, ...drawerPropsArg });
  };

  const cancle = () => setVisible(false);

  const register = () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(
      <Drawer {...drawerProps} onClose={cancle} visible={visible}>
        <Content {...contentProps}></Content>
      </Drawer>,
      div,
    );
    return div;
  };

  const destroy = (div: HTMLElement) => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };

  useEffect(() => {
    const container = register();
    return () => {
      destroy(container);
    };
  }, [visible]);

  return {
    cancle,
    show,
  };
};

export default useDrawer;
