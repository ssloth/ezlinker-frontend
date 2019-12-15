import request from '@/utils/request';

interface dispatchActionData {
  id?: string;
  ids?: string[];
  cmdKey: string;
  cmdValues: string | string[];
}

/**
 * 向设备发起操作
 * @param data
 */
export async function dispatchAction(data: dispatchActionData) {
  const { id, ids, cmdKey, cmdValues } = data;
  const rid = ids && ids.length > 0 ? ids.join(',') : id;

  return request(`/device/${rid}/action`, {
    method: 'POST',
    data: { cmdKey, cmdValues: Array.isArray(cmdValues) ? cmdValues : [cmdValues] },
  });
}
