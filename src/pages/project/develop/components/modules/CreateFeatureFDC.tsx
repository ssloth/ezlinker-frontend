import React from 'react';
import { Form, Input, Divider, Button, Icon, Select } from 'antd';
import classNames from 'classnames/bind';
import { useDynamicList } from '@umijs/hooks';
import { IFormDrawerContentProps } from '@/hooks/usePopup/type';
import styles from './CreateModuleFDC.less';
import { CMD_VALUE, TYPE } from '@/enums/product';
import { enums2Options } from '@/enums/utils';

const cx = classNames.bind(styles);
const FormItem = Form.Item;
const InputGroup = Input.Group;
const formLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const CreateFeatureFDC = (props: IFormDrawerContentProps) => {
  const {
    form: { getFieldDecorator },
    current,
  } = props;

  const { list, getKey, remove, push } = useDynamicList(current.cmdValues || []);

  const CmdValueRow = (index: number, item: any) => (
    <Form.Item key={getKey(index)}>
      <InputGroup style={{ width: '100%' }} compact>
        {getFieldDecorator(`cmdValues[${getKey(index)}].field`, {
          initialValue: item.field,
          rules: [
            {
              required: true,
              message: 'required',
            },
          ],
        })(<Input style={{ width: '25%' }} placeholder="字段名" />)}
        {getFieldDecorator(`cmdValues[${getKey(index)}].type`, {
          initialValue: item.type,
          rules: [
            {
              required: true,
              message: 'required',
            },
          ],
        })(
          <Select style={{ width: '20%' }} placeholder="类型">
            {enums2Options(CMD_VALUE)}
          </Select>,
        )}
        {getFieldDecorator(`cmdValues[${getKey(index)}].defaultValue`, {
          initialValue: item.defaultValue,
        })(<Input style={{ width: '20%' }} placeholder="默认值" />)}
        {getFieldDecorator(`cmdValues[${getKey(index)}].description`, {
          initialValue: item.description,
          rules: [
            {
              required: true,
              message: 'required',
            },
          ],
        })(
          <Input
            style={{ width: '35%' }}
            addonAfter={
              <div onClick={() => remove(index)}>
                <Icon type="close"></Icon>
              </div>
            }
            placeholder="备注"
          />,
        )}
      </InputGroup>
    </Form.Item>
  );

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
            {enums2Options(TYPE)}
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
        {list.map((ele, index) => CmdValueRow(index, ele))}
        <Button type="dashed" style={{ width: '100%' }} onClick={() => push('')}>
          <Icon type="plus" /> 新增
        </Button>
      </FormItem>
      <Divider style={{ marginTop: 20 }} orientation="left">
        绑定模块
      </Divider>
    </div>
  );
};

export default CreateFeatureFDC;
