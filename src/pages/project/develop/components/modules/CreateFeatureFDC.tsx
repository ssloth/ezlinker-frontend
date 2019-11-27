import React from 'react';
import { Form, Input, Divider } from 'antd';
import classNames from 'classnames/bind';
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
          initialValue: current.description,
        })(<Input placeholder="大小写字母和下划线" />)}
      </FormItem>
    </div>
  );
};

export default CreateFeatureFDC;
