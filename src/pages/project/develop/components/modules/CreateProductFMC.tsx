import React from 'react';
import { Form, Input } from 'antd';
import { IFormModalContentProps } from '@/hook/useModal/useFormModal';

const FormItem = Form.Item;
const { TextArea } = Input;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateProductFMC = (props: IFormModalContentProps) => {
  const { form, current = {} } = props;
  const { getFieldDecorator } = form;
  return (
    <>
      <FormItem label="产品名称" {...formLayout}>
        {getFieldDecorator('title', {
          rules: [{ required: true, message: '请输入产品名称' }],
          initialValue: current.title,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formLayout} label="产品描述">
        {getFieldDecorator('subDescription', {
          rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
          initialValue: current.subDescription,
        })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
      </FormItem>
    </>
  );
};

export default CreateProductFMC;
