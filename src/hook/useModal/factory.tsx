import React from 'react';
import { Form, Input } from 'antd';

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

function modalContentFactory(form: any, formItem: any[]): React.FC<any> {
  return () => (
    <>
      {formItem.map(item => (
        <Form.Item label="名称" {...formLayout}>
          {form.getFieldDecorator(item.name, {})(<Input />)}
        </Form.Item>
      ))}
    </>
  );
}

export { modalContentFactory };
