import React from 'react';
import { Form, Input } from 'antd';
import { ValidationRule } from 'antd/lib/form';

interface IFormItem {
  label: string;
  name: string;
  type: React.Component<any, any>;
  initialValue?: string;
  rules?: ValidationRule[];
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

// const defaultConfig = {}

function modalContentFactory(form: any, formItems: IFormItem[]): React.FC<any> {
  return () => (
    <>
      {formItems.map(item => {
        const { type } = item;
        return (
          <Form.Item label={item.label} {...formLayout}>
            {form.getFieldDecorator(item.name, {
              rules: item.rules,
              initialValue: item.initialValue,
            })(<Input placeholder={`请输入${item.label} ${type}`} />)}
          </Form.Item>
        );
      })}
      )
    </>
  );
}

export { modalContentFactory };
