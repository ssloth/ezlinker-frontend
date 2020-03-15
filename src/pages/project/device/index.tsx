import React, { useState, useEffect, useRef } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { get } from 'lodash';
import { Button, Tabs, Spin } from 'antd';
import { useRestful, useFormModal } from '@/hooks';
import { PRODUCTS_API, DEVICES_API } from '@/services/resources';
import { Product, Device } from '@/services/resources/models';
import { ConnectProps } from '@/models/connect';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-table';
import DeviceTable from './components/DeviceTable/index';
import CreateDeviceFMC, { CreateDeviceFMCProps } from './components/modules/CreateDeviceFMC';
import styles from './index.less';

const { TabPane } = Tabs;

interface ManageProps extends FormComponentProps, ConnectProps {}

const DeviceLayout: React.FC<ManageProps> = props => {
  const projectId = get(props, 'match.params.id');
  const ref = useRef<ActionType>();
  const [productId, setProductId] = useState<string>();
  const productResource = useRestful<Product>(PRODUCTS_API);
  const deviceResource = useRestful<Device>(DEVICES_API);
  const deviceModal = useFormModal<CreateDeviceFMCProps>(CreateDeviceFMC, deviceResource, {
    title: '创建设备',
  });
  const { data: productData } = productResource.useSWRQuery({ projectId });

  const handleCreateDevice = () => {
    deviceModal.show({ productId, productList: productData ? productData.records : [] });
  };

  const handleTabChange = (record: string) => {
    setProductId(record);
    setTimeout(() => {
      if (ref.current?.reload) ref.current.reload();
    });
  };

  const headerTitle = productData ? (
    <>
      {productData?.records.length > 0 ? (
        <Tabs
          style={{ width: 900 }}
          defaultActiveKey={productData?.records?.[0].id.toString() || '0'}
          size="large"
          onChange={handleTabChange}
        >
          {productData?.records.map(item => (
            <TabPane tab={item.name} key={item.id.toString()}></TabPane>
          ))}
        </Tabs>
      ) : (
        '暂无产品'
      )}
    </>
  ) : (
    <Spin />
  );

  useEffect(() => {
    if (productData && productData.records.length > 0) {
      handleTabChange(`${productData.records[0].id}`);
    }
  }, [productData]);

  return (
    <div className={styles.wrapper}>
      <DeviceTable
        ref={ref}
        headerTitle={headerTitle}
        size="middle"
        projectId={projectId}
        productId={productId}
        options={false}
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} type="primary" onClick={handleCreateDevice}>
            新建设备
          </Button>,
        ]}
      />
    </div>
  );
};

export default DeviceLayout;
