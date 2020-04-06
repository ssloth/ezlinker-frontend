import React from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, InputNumber, Select, Button } from 'antd';
import { useDynamicList } from '@umijs/hooks';
import { WrappedFormUtils } from '@ant-design/compatible/lib/form/Form';
import { enums2Options } from '@/enums/utils';
import { CMD_VALUE } from '@/enums/product';
import styles from './index.less';
import { validatorDefaultValue } from './util';

const TableColumnsDesign = ({
  form,
  field,
  current,
}: {
  form: WrappedFormUtils;
  field: string;
  current: any[];
}) => {
  const { list, getKey, remove, push } = useDynamicList(current || []);
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form;

  const handleTypeChange = (fieldName: string, type: CMD_VALUE) => {
    const defaultValueTableMap = {
      [CMD_VALUE.string]: 'default',
      [CMD_VALUE.number]: 0,
      [CMD_VALUE.JSON]: '{"key": "value"}',
      [CMD_VALUE.boolean]: 0,
    };

    setTimeout(() => {
      if (defaultValueTableMap[type] === undefined) return;
      setFieldsValue({
        [fieldName]: defaultValueTableMap[type],
      });
    });
  };

  const renderDefaultValue = (type: CMD_VALUE) => {
    const tableMap = {
      [CMD_VALUE.string]: <Input style={{ width: '20%' }} placeholder="默认值" />,
      [CMD_VALUE.number]: <InputNumber style={{ width: '20%' }} placeholder="默认值" />,
      [CMD_VALUE.JSON]: <Input style={{ width: '20%' }} placeholder="默认值" />,
      [CMD_VALUE.boolean]: (
        <Select style={{ width: '20%' }} placeholder="默认值">
          <Select.Option value={0}>false</Select.Option>
          <Select.Option value={1}>true</Select.Option>
        </Select>
      ),
    };

    return tableMap[type] || tableMap[CMD_VALUE.string];
  };

  const TableRow = (index: number, item: any) => (
    <Form.Item key={getKey(index)}>
      <Input.Group style={{ width: '100%' }} compact>
        {getFieldDecorator(`${field}[${getKey(index)}].field`, {
          initialValue: item.field,
          rules: [
            {
              required: true,
              message: 'required',
            },
          ],
        })(<Input style={{ width: '25%' }} placeholder="字段名" />)}
        {getFieldDecorator(`${field}[${getKey(index)}].type`, {
          initialValue: item.type,
          rules: [
            {
              required: true,
              message: 'required',
            },
          ],
        })(
          <Select
            onChange={value =>
              handleTypeChange(`${field}[${getKey(index)}].defaultValue`, value as any)
            }
            style={{ width: '20%' }}
            placeholder="类型"
          >
            {enums2Options(CMD_VALUE)}
          </Select>,
        )}
        {getFieldDecorator(`${field}[${getKey(index)}].defaultValue`, {
          initialValue: item.defaultValue,
          rules: [{ validator: validatorDefaultValue, type: 'json' }],
        })(renderDefaultValue(getFieldValue(`${field}[${getKey(index)}].type`)))}
        {getFieldDecorator(`${field}[${getKey(index)}].description`, {
          initialValue: item.description,
          rules: [
            {
              required: true,
              message: 'required',
            },
          ],
        })(
          <Input
            style={{ width: '35%' }}
            addonAfter={
              <div className={styles.close} onClick={() => remove(index)}>
                <CloseOutlined className={styles.icon}></CloseOutlined>
              </div>
            }
            placeholder="备注"
          />,
        )}
      </Input.Group>
    </Form.Item>
  );

  return (
    <>
      {list.map((ele, index) => TableRow(index, ele))}
      <Button type="dashed" style={{ width: '100%' }} onClick={() => push('')}>
        <PlusOutlined /> 新增
      </Button>
    </>
  );
};

export default TableColumnsDesign;
