import React from 'react';
import { Form, Input, Divider } from 'antd';
import classNames from 'classnames/bind';
import TextArea from 'antd/lib/input/TextArea';
import { IFormDrawerContentProps } from '@/hooks/usePopup/type';
import styles from './CreateModuleFDC.less';

const cx = classNames.bind(styles);
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const CreateFeatureFDC = (props: IFormDrawerContentProps) => {
  const {
    form: { getFieldDecorator },
    current,
  } = props;

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
      <FormItem label="指令" {...formLayout}>
        {getFieldDecorator('cmdKey', {
          rules: [{ required: true, message: '指令名称' }],
          initialValue: current.cmdKey,
        })(<Input placeholder="指令名称" />)}
      </FormItem>
      <FormItem label="内容" {...formLayout}>
        {getFieldDecorator('cmdValue', {
          rules: [{ required: true, message: '请输入指令内容' }],
          initialValue: current.cmdValue,
        })(<TextArea rows={3} placeholder="指令内容" />)}
      </FormItem>
      <Divider style={{ marginTop: 20 }} orientation="left">
        绑定模块
      </Divider>
    </div>
  );
};

export default CreateFeatureFDC;
