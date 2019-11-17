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
      <Form.Item label='产品名称' {...formLayout}>
        {form.getFieldDecorator('name', {
          initialValue: current.name,
        })(<Input />)}
      </Form.Item>
      <Form.Item label='产品名称' {...formLayout}>
        {form.getFieldDecorator('icon', {
          initialValue: current.icon,
        })(<Input />)}
      </Form.Item>
      <Form.Item label='产品名称' {...formLayout}>
        {form.getFieldDecorator('desc', {
          initialValue: current.name,
        })(<Input />)}
      </Form.Item>
    </>
  );
};

export default CreateProjectFMC;
