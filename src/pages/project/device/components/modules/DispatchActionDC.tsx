import React from 'react';
import { Button, Form, Input, Select, InputNumber, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import { Device, Feature, Structrue, StructrueType } from '@/services/resources/models';
import { dispatchAction } from '@/services/device';

const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface IDispatchActionDCProps extends FormComponentProps {
  device: Device;
  feature: Feature;
}

const DispatchActionDC = (props: IDispatchActionDCProps) => {
  const { feature, device, form } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;

  const handleSubmit = (reset?: boolean) => {
    validateFields(async (error: any, value: any) => {
      if (error) return;
      dispatchAction({ id: device.id, cmdKey: feature.cmdKey, cmdValues: value }).then(() => {
        message.success('发送成功');
      });
      if (reset) resetFields();
    });
  };

  const renderFormItem = (structure: Structrue) => {
    switch (structure.type) {
      case StructrueType.boolean:
        return (
          <Select style={{ width: '100%' }} placeholder="选择">
            <Option value={0} key={0}>
              false
            </Option>
            <Option value={1} key={1}>
              true
            </Option>
          </Select>
        );
      case StructrueType.number:
        return <InputNumber style={{ width: '100%' }} placeholder={structure.description} />;
      case StructrueType.string:
        return <Input style={{ width: '100%' }} placeholder={structure.description} />;
      case StructrueType.JSON:
        return <TextArea style={{ width: '100%' }} rows={3} placeholder={structure.description} />;
      default:
        return <Input style={{ width: '100%' }} placeholder={structure.description} />;
    }
  };

  return (
    <div>
      {feature.cmdValues.map((item: Structrue) => (
        <FormItem label={item.description} {...formLayout}>
          {getFieldDecorator(item.field, {
            initialValue: item.defaultValue,
          })(renderFormItem(item))}
        </FormItem>
      ))}

      <FormItem wrapperCol={{ span: 20, offset: 2 }}>
        <Button.Group style={{ width: '100%', marginTop: 10 }}>
          <Button style={{ width: '50%', marginTop: 30 }} onClick={() => handleSubmit(true)}>
            发送
          </Button>
          <Button style={{ width: '50%', marginTop: 10 }} onClick={() => handleSubmit(false)}>
            发送(不重置表单)
          </Button>
        </Button.Group>
        <Button style={{ width: '100%', marginTop: 10 }} onClick={() => resetFields()}>
          重置
        </Button>
      </FormItem>
    </div>
  );
};
export default Form.create<any>()(DispatchActionDC);
