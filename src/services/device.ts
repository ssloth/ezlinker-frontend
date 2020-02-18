import request from '@/utils/request';
import { IServerResult } from '@/typings/server';

interface dispatchActionData {
  id?: string | number;
  ids?: string[] | number[];
  cmdKey: string;
  cmdValues: string | string[];
}

/**
 * 向设备发起操作
 * @param data
 */
export async function dispatchAction(data: dispatchActionData): Promise<IServerResult> {
  const { id, ids, cmdKey, cmdValues } = data;
  const rid = ids && ids.length > 0 ? ids.join(',') : id;

  return request(`/devices/${rid}/action`, {
    method: 'POST',
    data: { cmdKey, cmdValues: Array.isArray(cmdValues) ? cmdValues : [cmdValues] },
  });
}

/**
 * 向设备发起操作
 * @param data
 */
export async function queryDataStructureByDeviceId(deviceId: number): Promise<IServerResult> {
  return request('/devices/queryDataStructureByDeviceId', {
    method: 'GET',
    params: { deviceId },
  });
}
