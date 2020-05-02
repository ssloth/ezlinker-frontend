import React from 'react';
import { createFromIconfontCN, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { Input, Select, Button } from 'antd';
import { IFormModalContentProps } from '@/hooks/usePopup/type';
import TableColumnsDesign from '@/pages/project/components/TableColumnsDesign';
import { enums2Options } from '@/enums/utils';
import { PRODUCT_TYPE, PROTOCOL_TYPE } from '@/enums/product';
import { useModal } from '@/hooks';
import SelectProductIconMC, { SelectProductIconMCProps } from './SelectProductIconMC';
import '@ant-design/compatible/assets/index.css';

const IconFont = createFromIconfontCN({ scriptUrl: '/iconfont/iconfont.js' });

const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const CreateProductFMC = (props: IFormModalContentProps) => {
  const { form, current = {} } = props;
  const { getFieldDecorator } = form;
  const selectProductIcon = useModal<SelectProductIconMCProps>(SelectProductIconMC, {
    title: '选择图标',
  });

  const productModelCallBack = (value: string) => {
    form.setFieldsValue({
      logo: value,
    });
  };

  return (
    <>
      <FormItem label="名称" {...formLayout}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入产品名称' }],
          initialValue: current.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem label="描述" {...formLayout}>
        {getFieldDecorator('description', {
          rules: [{ required: true, message: '请输入产品描述' }],
          initialValue: current.description,
        })(<Input placeholder="请输入产品描述" />)}
      </FormItem>
      <FormItem label="标签" {...formLayout}>
        {getFieldDecorator('tags', {
          initialValue: current.tags,
        })(
          <Select mode="tags" style={{ width: '100%' }} placeholder="请添加产品标签">
            {(current.tags ? current.tags : []).map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
      <FormItem label="协议" {...formLayout}>
        {getFieldDecorator('protocol', {
          initialValue: current.protocol,
        })(
          <Select style={{ width: '100%' }} placeholder="请选择产品的协议">
            {enums2Options(PROTOCOL_TYPE)}
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
        <TableColumnsDesign form={form} field="parameters" current={current.parameters} />
      </FormItem>
      <FormItem label="图标" {...formLayout}>
        <Button
          onClick={() => selectProductIcon.show({ callback: productModelCallBack })}
          style={{ width: 100, height: 100 }}
        >
          {form.getFieldValue('logo') ? (
            <IconFont
              style={{ fontSize: 60, textAlign: 'center' }}
              type={form.getFieldValue('logo')}
            />
          ) : (
            <PlusOutlined />
          )}
        </Button>
        {getFieldDecorator('logo', {
          initialValue: current.logo,
        })(<Input style={{ display: 'none' }} />)}
      </FormItem>
    </>
  );
};

export default CreateProductFMC;
