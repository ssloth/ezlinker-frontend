import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select, Input, Divider } from 'antd';
import classNames from 'classnames/bind';
import { IFormDrawerContentProps } from '@/hooks/usePopup/type';
import TableCloumnsDesign from '@/pages/project/components/TableCloumnsDesign';
import styles from './CreateModuleFDC.less';

const cx = classNames.bind(styles);
const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const CreateModuleDFC = (props: IFormDrawerContentProps) => {
  const { form, current } = props;

  const { getFieldDecorator } = form;

  return (
    <div className={cx('wrapper')}>
      <Divider orientation="left">基本信息</Divider>
      <FormItem label="名称" {...formLayout}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '模块名称（大小写字母和下划线）' }],
          initialValue: current.name,
        })(<Input placeholder="请输入模块名称（大小写字母和下划线）" />)}
      </FormItem>
      <FormItem label="描述" {...formLayout}>
        {getFieldDecorator('description', {
          rules: [{ required: true, message: '模块描述' }],
          initialValue: current.description,
        })(<Input placeholder="请输入模块描述" />)}
      </FormItem>
      <FormItem label="协议" {...formLayout}>
        {getFieldDecorator('protocol', {
          initialValue: current.protocol,
          rules: [{ required: true, message: '请选择协议类型' }],
        })(
          <Select style={{ width: '100%' }} placeholder="请选择协议类型">
            <Option key={1} value={1}>
              MQTT
            </Option>
          </Select>,
        )}
      </FormItem>
      <FormItem label="类型" {...formLayout}>
        {getFieldDecorator('type', {
          initialValue: current.type,
          rules: [{ required: true, message: '请选择设备类型' }],
        })(
          <Select style={{ width: '100%' }} placeholder="请选择设备类型">
            <Option key={1} value={1}>
              通用
            </Option>
          </Select>,
        )}
      </FormItem>
      <FormItem label="属性" {...formLayout}>
        <TableCloumnsDesign form={form} field="dataAreas" current={current.dataAreas} />
      </FormItem>
      <Divider style={{ marginTop: 20 }} orientation="left">
        绑定功能
      </Divider>
      <FormItem label="功能" {...formLayout}>
        {getFieldDecorator('type', {
          initialValue: current.type,
          rules: [{ required: true, message: '请选择设备类型' }],
        })(
          <Select style={{ width: '100%' }} placeholder="请选择绑定的功能">
            <Option key={1} value={1}>
              通用
            </Option>
          </Select>,
        )}
      </FormItem>
    </div>
  );
};

export default CreateModuleDFC;
