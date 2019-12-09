import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormComponentProps } from 'antd/lib/form';
import { get } from 'lodash';
import router from 'umi/router';
import styles from './index.less';
import { useRestful } from '@/hooks';
import { PRODUCTS_API } from '@/services/resources';
import { Product } from '@/services/resources/models';
import { ConnectProps } from '@/models/connect';

interface ManageProps extends FormComponentProps, ConnectProps {}

const Manage: React.FC<ManageProps> = props => {
  const projectId = get(props, 'match.params.id');
  const [productId, setProductId] = useState<string>('');
  const url = get(props, 'match.url');
  const productResource = useRestful<Product>(PRODUCTS_API);
  const { data: productData } = productResource.useSWRQuery({ projectId });

  const handleTabChange = (record: string) => {
    setProductId(record);
    router.push(`${url}/${record}`);
  };

  return (
    <PageHeaderWrapper
      onTabChange={handleTabChange}
      tabActiveKey={productId}
      tabList={
        productData && productData.records.map(({ name, id }) => ({ tab: name, key: `${id}` }))
      }
    >
      <div className={styles.tableList}>{props.children}</div>
    </PageHeaderWrapper>
  );
};

export default Manage;
