import { ModuleStatusType, ModuleProtocolType, IDevice } from '@/typings/types';

export enum DEVICE_STATUS {
  inactivated,
  active,
  normal,
  warning,
  abnormal,
}

/** 获取 */
export const getDeviceStatus = (device: IDevice): DEVICE_STATUS => {
  if (device.modules.every(item => !item.lastActiveTime)) {
    return DEVICE_STATUS.inactivated;
  }

  if (
    device.modules.some(item => !item.lastActiveTime) &&
    device.modules.some(item => item.lastActiveTime)
  ) {
    return DEVICE_STATUS.active;
  }

  if (
    device.modules
      .filter(item => item.protocol === ModuleProtocolType.MQTT)
      .every(item => item.status === ModuleStatusType.DROPPED)
  ) {
    return DEVICE_STATUS.abnormal;
  }

  if (
    device.modules
      .filter(item => item.protocol === ModuleProtocolType.MQTT)
      .every(item => item.status === ModuleStatusType.ONLINE)
  ) {
    return DEVICE_STATUS.normal;
  }

  return DEVICE_STATUS.warning;
};
