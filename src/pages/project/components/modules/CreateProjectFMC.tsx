import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select } from 'antd';
import { IFormModalContentProps } from '@/hooks/usePopup/type';
import { enums2Options } from '@/enums/utils';
import { PROJECT_TYPE } from '@/enums/project';

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
        })(<Input placeholder="请输入项目的名称" />)}
      </Form.Item>
      <Form.Item label="类型" {...formLayout}>
        {form.getFieldDecorator('name', {
          initialValue: current.type,
        })(
          <Select placeholder="请选择项目的类型" style={{ width: '100%' }}>
            {enums2Options(PROJECT_TYPE)}
          </Select>,
        )}
      </Form.Item>
      <Form.Item label="描述" {...formLayout}>
        {form.getFieldDecorator('description', {
          initialValue: current.description,
        })(<Input placeholder="请填写项目描述" />)}
      </Form.Item>
      <Form.Item label="图标" {...formLayout}>
        {form.getFieldDecorator('logo', {
          initialValue: current.logo,
        })(<Input placeholder="请选择项目图标" />)}
      </Form.Item>
    </>
  );
};

export default CreateProjectFMC;
