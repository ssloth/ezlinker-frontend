import React from 'react';
import { Form, Input, Select } from 'antd';
import { IFormModalContentProps } from '@/hook/useModal/type';

const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

const CreateProductFMC = (props: IFormModalContentProps) => {
  const { form, current = {} } = props;
  const tags: any[] = [];
  const types: any[] = [];
  const { getFieldDecorator } = form;
  return (
    <>
      <FormItem label="名称" {...formLayout}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入产品名称' }],
          initialValue: current.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem label="描述" {...formLayout}>
        {getFieldDecorator('description', {
          rules: [{ required: true, message: '请输入产品描述' }],
          initialValue: current.description,
        })(<Input placeholder="请输入产品描述" />)}
      </FormItem>
      <FormItem label="标签" {...formLayout}>
        {getFieldDecorator('tag', {
          initialValue: current.tag,
        })(
          <Select mode="tags" style={{ width: '100%' }} placeholder="请添加产品标签">
            {tags.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
      <FormItem label="类型" {...formLayout}>
        {getFieldDecorator('type', {
          initialValue: current.type,
        })(
          <Select style={{ width: '100%' }} placeholder="请选择产品类型">
            {types.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
      <FormItem label="属性" {...formLayout}>
        {getFieldDecorator('paramMap', {
          initialValue: current.paramMap,
        })(<Input placeholder="请添加" />)}
      </FormItem>
    </>
  );
};

export default CreateProductFMC;
