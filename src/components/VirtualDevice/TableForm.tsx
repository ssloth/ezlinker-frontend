import React from 'react';
import { Form, Input, Select, InputNumber } from 'antd';
import { useDynamicList } from '@umijs/hooks';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { CMD_VALUE } from '@/enums/product';
// import styles from './TableForm.less';

const { Option } = Select;

export interface CloumnField {
  field: string;
  type: CMD_VALUE;
  description: string;
  defaultValue: any;
}

const renderFormItem = (field: CloumnField, width: number) => {
  if (field.type === CMD_VALUE.string || field.type === CMD_VALUE.JSON) {
    return <Input style={{ width: `${width}%` }} placeholder={field.description} />;
  }
  if (field.type === CMD_VALUE.boolean) {
    return (
      <Select style={{ width: `${width}%` }} placeholder={field.description}>
        <Option value={1}>true</Option>
        <Option value={0}>false</Option>
      </Select>
    );
  }
  return <InputNumber style={{ width: `${width}%` }} placeholder={field.description}></InputNumber>;
};

const TableForm = ({ form, fields }: { form: WrappedFormUtils; fields: CloumnField[] }) => {
  const { list, getKey } = useDynamicList([]);
  const { getFieldDecorator } = form;

  const TableRow = (index: number) => (
    <Form.Item key={getKey(index)}>
      <Input.Group style={{ width: '100%' }} compact>
        {fields.map(item =>
          getFieldDecorator(`data[${getKey(index)}].${item.field}`, {
            initialValue: item.field,
          })(renderFormItem(item, 100 / fields.length)),
        )}
      </Input.Group>
    </Form.Item>
  );

  return <>{list.map((ele, index) => TableRow(index))}</>;
};

export default TableForm;
