import React from 'react';
import { Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Device, Product } from '@/services/resources/models';

const FormItem = Form.Item;
const { Option } = Select;
const formLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

export interface CreateDeviceFMCProps extends FormComponentProps {
  current: Device;
  productList: Product[];
}

const CreateDeviceFMC = (props: CreateDeviceFMCProps) => {
  const { form, current, productList } = props;
  const { getFieldDecorator } = form;

  return (
    <>
      <FormItem label="产品" {...formLayout}>
        {getFieldDecorator('productId', {
          rules: [{ required: true, message: '请选择产品' }],
          initialValue: current.productId,
        })(
          <Select placeholder="请选择产品" style={{ width: '100%' }}>
            {productList.map(item => (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
      <FormItem label="名称" {...formLayout}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请填写名词' }],
          initialValue: current.name,
        })(<Input placeholder="如果不填写默认使用 产品名+id编号的形式" />)}
      </FormItem>
      <FormItem label="描述" {...formLayout}>
        {getFieldDecorator('description', {
          rules: [{ required: true, message: '请填写描述' }],
          initialValue: current.description,
        })(<Input placeholder="请填写描述" />)}
      </FormItem>
      <FormItem label="标签" {...formLayout}>
        {getFieldDecorator('tags', {
          initialValue: current.tags,
        })(
          <Select mode="tags" style={{ width: '100%' }} placeholder="请添加产品标签">
            {(current.tags ? current.tags : []).map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
    </>
  );
};

export default CreateDeviceFMC;
