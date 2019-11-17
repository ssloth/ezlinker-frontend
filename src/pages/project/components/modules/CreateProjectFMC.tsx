import React from 'react';
import { Form, Input } from 'antd';
import { IFormModalContentProps } from '@/hook/useModal/useFormModal';

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateProjectFMC = (props: IFormModalContentProps) => {
  const { form } = props;

  return (
    <>
      <Form.Item label='产品名称' {...formLayout}>
        {form.getFieldDecorator('name')(<Input />)}
      </Form.Item>
      <Form.Item label='产品名称' {...formLayout}>
        {form.getFieldDecorator('icon')(<Input />)}
      </Form.Item>
      <Form.Item label='产品名称' {...formLayout}>
        {form.getFieldDecorator('desc')(<Input />)}
      </Form.Item>
    </>
  );
};

export default CreateProjectFMC;
