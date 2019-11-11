import { Form, Input } from 'antd';
import React from 'react';

const FormItem = Form.Item;
const { TextArea } = Input;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateProductFormModalContent: React.FC = props => {
  const { handleSubmit, current, form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={handleSubmit}>
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
    </Form>
  );
};

export default CreateProductFormModalContent;
