import { CMD_VALUE } from '@/enums/product';

export const validatorDefaultValue = (rule: CMD_VALUE, value: any, callback: Function) => {
  console.log(rule, value);
  if (rule === CMD_VALUE.JSON) {
    try {
      JSON.parse(value);
      return true;
    } catch {
      callback('json格式错误');
    }
  }
  return true;
};
