import { DrawerProps } from 'antd/lib/drawer';
import { FormComponentProps } from 'antd/lib/form';
import { IAction } from '@/typings/global';
import { IUseResuful } from '../useRestful/useRestful';

export interface IPopupBoxOptions {
  type: 'Drawer' | 'Modal';
}

// Drawer 和 Modal 暂时使用相同的prop检查
export interface IFormPopupBoxOption extends DrawerProps {
  defaultFormValues?: any;
  successMsg?: string | null;
  callback?: Function;
}

export interface IFormPopupBoxContentProps extends FormComponentProps {
  current?: any;
  defaultFormValues?: any;
}

export interface IFormPopupBoxProps extends FormComponentProps {
  action: IAction | string | IUseResuful<any>;
  formPopupBoxContentProps: any;
  options: IFormPopupBoxOption;
  FormPopupBoxContent: React.FC<IFormPopupBoxContentProps>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  popupBoxType: 'Modal' | 'Drawer';
}

export interface IUseFormPopupBox {
  show: (formPopupBoxContentProps?: any, options?: any) => any;
  create: (defaultFormValues: any) => any;
  edit: (record: any) => any;
  cancle: () => any;
  render: () => React.ReactNode;
}

export interface IUsePopupBox<ContentProps = any> {
  show: (contentProps?: ContentProps, drawerProps?: DrawerProps) => any;
  cancle: () => any;
  render: () => React.ReactNode;
}

export type IUseModal = IUsePopupBox;
export type IUseDrawer = IUsePopupBox;

export type IuseFormModal = IUseFormPopupBox;
export type IUseFormDrawer = IUseFormPopupBox;

export type IFormModalContentProps = IFormPopupBoxContentProps;
export type IFormDrawerContentProps = IFormPopupBoxContentProps;

export type IuseFormModalOption = IFormPopupBoxOption;
export type IUseFormDrawerOption = IFormPopupBoxOption;

export type IUseFormDrawerPorps = IFormPopupBoxProps;
export type IuseFormModalProps = IFormPopupBoxProps;
