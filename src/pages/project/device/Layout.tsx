import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormComponentProps } from 'antd/lib/form';
import { get } from 'lodash';
import router from 'umi/router';
import { Card, Spin } from 'antd';
import { useRestful } from '@/hooks';
import { PRODUCTS_API } from '@/services/resources';
import { Product } from '@/services/resources/models';
import { ConnectProps } from '@/models/connect';

interface ManageProps extends FormComponentProps, ConnectProps {}

const DeviceLayout: React.FC<ManageProps> = props => {
  const projectId = get(props, 'match.params.id');
  const [productId, setProductId] = useState<string>('');
  const url = get(props, 'match.url');
  const productResource = useRestful<Product>(PRODUCTS_API);
  const { data: productData } = productResource.useSWRQuery({ projectId });

  const handleTabChange = (record: string) => {
    setProductId(record);
    router.push(`${url}/${record}`);
  };

  useEffect(() => {
    if (productData && productData.records.length > 0) {
      setProductId(`${productData.records[0].id}`);
    }
  }, [productData]);

  return (
    <PageHeaderWrapper
      onTabChange={handleTabChange}
      tabActiveKey={productId}
      content={!productData && <Spin />}
      tabList={
        productData && productData.records.map(({ name, id }) => ({ tab: name, key: `${id}` }))
      }
    >
      <div>
        <Card bodyStyle={{ padding: 0 }}>{props.children}</Card>
      </div>
    </PageHeaderWrapper>
  );
};

export default DeviceLayout;
