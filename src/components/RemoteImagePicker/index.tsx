import React, { forwardRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModal, useRestful } from '@/hooks';
import { useControllableValue } from '@umijs/hooks';
import ImageMC from './ImageMC';

interface IProps {
  url: string;
  value?: string;
  onChange?: Function;
}

const RemoteImagePicker = forwardRef((props: IProps, ref: any) => {
  const [value, onChange] = useControllableValue(props);
  const { data } = useRestful(props.url).useSWRQuery();

  const imageModal = useModal(ImageMC);

  return !value ? (
    <Button
      ref={ref}
      type="ghost"
      onClick={() => imageModal.show({ urls: data || [], value, onChange })}
      style={{ width: 100, height: 100 }}
    >
      <PlusOutlined />
    </Button>
  ) : (
    <img
      ref={ref}
      width={100}
      height={100}
      src={value}
      onClick={() => imageModal.show({ urls: data || [], value, onChange })}
      alt="图标"
    />
  );
});

export default RemoteImagePicker;
