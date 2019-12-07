import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface IEnumsDeconstructionItem {
  key: string;
  value: string | number;
}

export const enumsDeconstruction = (enums: Object): IEnumsDeconstructionItem[] => {
  const r = Object.entries(enums);
  return r
    .slice(r.length / 2, r.length)
    .map(([value, key]) => ({ key, value: value as string | number }));
};

export const optionsFactory = (items: IEnumsDeconstructionItem[]) =>
  items.map(item => (
    <Option key={item.key} value={item.key}>
      {item.value}
    </Option>
  ));

export const enums2Options = (enums: Object) => optionsFactory(enumsDeconstruction(enums));
