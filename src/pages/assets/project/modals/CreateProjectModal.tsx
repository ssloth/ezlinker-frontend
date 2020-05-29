import React from 'react';
import { Form, Input, Select, Modal } from 'antd';
import RemoteImagePicker from '@/components/RemoteImagePicker';
import { enums2Options } from '@/enums/utils';
import { PROJECT_TYPE } from '@/enums/project';
import { PROJECT_ICON_API } from '@/services/resources';

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateProjectModal = (props: any) => {
  const { current, visible, control } = props;
  return (
    <Modal visible={visible} onCancel={control.setFalse}>
      <Form {...formLayout} initialValues={current}>
        <Form.Item label="名称" name={current.name}>
          <Input placeholder="请输入项目的名称" />
        </Form.Item>
        <Form.Item label="类型" name={current.type}>
          <Select placeholder="请选择项目的类型" style={{ width: '100%' }}>
            {enums2Options(PROJECT_TYPE)}
          </Select>
        </Form.Item>
        <Form.Item label="描述" name={current.description}>
          <Input placeholder="请填写项目描述" />
        </Form.Item>
        <Form.Item label="图标" name={current.logo}>
          <RemoteImagePicker url={PROJECT_ICON_API} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;
