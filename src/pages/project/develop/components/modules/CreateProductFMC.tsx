import React from 'react';
import { Form, Input, Select } from 'antd';
import { IFormModalContentProps } from '@/hooks/usePopup/type';
import TableCloumnsDesign from '@/pages/project/components/TableCloumnsDesign';
import { enums2Options } from '@/enums/utils';
import { PRODUCT_TYPE } from '@/enums/product';

const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const CreateProductFMC = (props: IFormModalContentProps) => {
  const { form, current = {} } = props;
  const { getFieldDecorator } = form;
  const tags:[] = []
  return (
    <>
      <FormItem label="名称" {...formLayout}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入产品名称' }],
          initialValue: current.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem label="图标" {...formLayout}>
        {getFieldDecorator('logo', {
          initialValue: current.logo,
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
            {enums2Options(PRODUCT_TYPE)}
          </Select>,
        )}
      </FormItem>
      <FormItem label="属性" {...formLayout}>
        <TableCloumnsDesign form={form} field="parameters" current={current.parameters} />
      </FormItem>
    </>
  );
};

export default CreateProductFMC;
