import React from 'react';
import { Form, Input } from 'antd';
import { IFormModalContentProps } from '@/hooks/usePopup/type';

const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

const CreateUserFMC = (props: IFormModalContentProps) => {
  const { form, current = {} } = props;
  const { getFieldDecorator } = form;

  return (
    <>
      <FormItem label="用户名" {...formLayout}>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名' }],
          initialValue: current.username,
        })(<Input autoComplete="off" placeholder="请输入用户名" />)}
      </FormItem>
      <FormItem label="邮箱" {...formLayout}>
        {getFieldDecorator('email', {
          rules: [{ required: true, message: '请输入邮箱' }],
          initialValue: current.email,
        })(<Input autoComplete="off" placeholder="请输入邮箱" />)}
      </FormItem>
      <FormItem label="手机" {...formLayout}>
        {getFieldDecorator('phone', {
          rules: [{ required: true, message: '请输入手机' }],
          initialValue: current.phone,
        })(<Input autoComplete="off" placeholder="请输入手机" />)}
      </FormItem>
    </>
  );
};

export default CreateUserFMC;
