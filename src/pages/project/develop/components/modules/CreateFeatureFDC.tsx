import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Divider, Select } from 'antd';
import classNames from 'classnames/bind';
import { IFormDrawerContentProps } from '@/hooks/usePopup/type';
import { FEATURE_TYPE } from '@/enums/product';
import { enums2Options } from '@/enums/utils';
import TableCloumnsDesign from '@/pages/project/components/TableCloumnsDesign';
import styles from './CreateModuleFDC.less';

const cx = classNames.bind(styles);
const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const CreateFeatureFDC = (props: IFormDrawerContentProps) => {
  const { form, current } = props;
  const { getFieldDecorator } = form;
  return (
    <div className={cx('wrapper')}>
      <Divider orientation="left">基本信息</Divider>
      <FormItem label="标签" {...formLayout}>
        {getFieldDecorator('label', {
          rules: [{ required: true, message: '中英文和特殊符号' }],
          initialValue: current.label,
        })(<Input placeholder="可输入中英文和特殊符号" />)}
      </FormItem>
      <FormItem label="名称" {...formLayout}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '大小写字母和下划线' }],
          initialValue: current.name,
        })(<Input placeholder="大小写字母和下划线" />)}
      </FormItem>
      <FormItem label="类型" {...formLayout}>
        {getFieldDecorator('type', {
          rules: [{ required: true, message: '选择类型' }],
          initialValue: current.type,
        })(
          <Select placeholder="功能类型" style={{ width: '100%' }}>
            {enums2Options(FEATURE_TYPE)}
          </Select>,
        )}
      </FormItem>
      <FormItem label="指令" {...formLayout}>
        {getFieldDecorator('cmdKey', {
          rules: [{ required: true, message: '大小写字母 数字 下划线' }],
          initialValue: current.cmdKey,
        })(<Input placeholder="指令名称" />)}
      </FormItem>
      <FormItem label="内容" {...formLayout}>
        <TableCloumnsDesign form={form} field="cmdValues" current={current.cmdValues} />
      </FormItem>
      <Divider style={{ marginTop: 20 }} orientation="left">
        绑定模块
      </Divider>
    </div>
  );
};

export default CreateFeatureFDC;
