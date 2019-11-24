import React from 'react';
import { Form, Input } from 'antd';
import { IFormModalContentProps } from '@/hook/useModal/useFormModal';

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateProjectFMC = (props: IFormModalContentProps) => {
  const { form, current = {} } = props;
  return (
    <>
      <Form.Item label="名称" {...formLayout}>
        {form.getFieldDecorator('name', {
          initialValue: current.name,
        })(<Input />)}
      </Form.Item>
      <Form.Item label="图标" {...formLayout}>
        {form.getFieldDecorator('logo', {
          initialValue: current.logo,
        })(<Input />)}
      </Form.Item>
      <Form.Item label="描述" {...formLayout}>
        {form.getFieldDecorator('description', {
          initialValue: current.description,
        })(<Input />)}
      </Form.Item>
    </>
  );
};

export default CreateProjectFMC;
