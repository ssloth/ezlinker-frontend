import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Divider } from 'antd';
import classNames from 'classnames/bind';
import { IFormDrawerContentProps } from '@/hooks/usePopup/type';
import TableCloumnsDesign from '@/pages/project/components/TableCloumnsDesign';
import styles from './index.less';

const cx = classNames.bind(styles);
const FormItem = Form.Item;

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
          initialValue: current.description,
        })(<Input placeholder="请输入模块描述" />)}
      </FormItem>
      <FormItem label="属性" {...formLayout}>
        <TableCloumnsDesign form={form} field="dataAreas" current={current.dataAreas} />
      </FormItem>
    </div>
  );
};

export default CreateModuleDFC;
