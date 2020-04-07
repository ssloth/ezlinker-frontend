import { MODULE_STATUS, MODULE_PROTOCOL, IDevice } from '@/services/resources/models';

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
      .filter(item => item.protocol === MODULE_PROTOCOL.MQTT)
      .every(item => item.status === MODULE_STATUS.DROPPED)
  ) {
    return DEVICE_STATUS.abnormal;
  }

  if (
    device.modules
      .filter(item => item.protocol === MODULE_PROTOCOL.MQTT)
      .every(item => item.status === MODULE_STATUS.ONLINE)
  ) {
    return DEVICE_STATUS.normal;
  }

  return DEVICE_STATUS.warning;
};
