import React from 'react';
import { Form, Select, Input } from 'antd';
import { IFormDrawerContentProps } from '@/hook/useModal/type';

const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const CreateModuleDFC = (props: IFormDrawerContentProps) => {
  const {
    form: { getFieldDecorator },
    current,
  } = props;

  return (
    <>
      <FormItem label="名称" {...formLayout}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '模块名称（大小写字母和下划线）' }],
          initialValue: current.name,
        })(<Input placeholder="请输入模块名称（大小写字母和下划线）" />)}
      </FormItem>
      <FormItem label="描述" {...formLayout}>
        {getFieldDecorator('description', {
          rules: [{ required: true, message: '模块描述' }],
          initialValue: current.description,
        })(<Input placeholder="请输入模块描述" />)}
      </FormItem>
      <FormItem label="协议" {...formLayout}>
        {getFieldDecorator('protocol', {
          initialValue: current.protocol,
          rules: [{ required: true, message: '请选择协议类型' }],
        })(
          <Select style={{ width: '100%' }} placeholder="请选择协议类型">
            <Option key={1} value={1}>
              MQTT
            </Option>
          </Select>,
        )}
      </FormItem>
      <FormItem label="类型" {...formLayout}>
        {getFieldDecorator('type', {
          initialValue: current.type,
          rules: [{ required: true, message: '请选择设备类型' }],
        })(
          <Select style={{ width: '100%' }} placeholder="请选择设备类型">
            <Option key={1} value={1}>
              通用
            </Option>
          </Select>,
        )}
      </FormItem>
    </>
  );
};

export default CreateModuleDFC;
