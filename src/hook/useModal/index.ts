import { DrawerProps } from 'antd/lib/drawer';
import usePopupBox from './libs/usePopupBox';
import useFormPopupBox from './libs/useFormPopupBox';
import { IFormPopupBoxOption } from './type';
import { IAction } from '@/typings/global';
import { IUseResuful } from '../useRestful/useRestful';

const useFormModal = (
  FormModalContent: React.FC<any>,
  action: IAction | string | IUseResuful<any>,
  opt: IFormPopupBoxOption = {},
) => useFormPopupBox(FormModalContent, action, opt, 'Modal');

const useFormDrawer = (
  FormDrawerContent: React.FC<any>,
  action: IAction | string | IUseResuful<any>,
  opt: IFormPopupBoxOption = {},
) => useFormPopupBox(FormDrawerContent, action, opt, 'Drawer');

const useModal = (ModalContent: React.FC<any>, ModalPropsDefault: DrawerProps = {}) =>
  usePopupBox(ModalContent, ModalPropsDefault, 'Modal');

const useDrawer = (ModalContent: React.FC<any>, DrawerPropsDefault: DrawerProps = {}) =>
  usePopupBox(ModalContent, DrawerPropsDefault, 'Drawer');

export { useFormModal, useFormDrawer, useModal, useDrawer };
