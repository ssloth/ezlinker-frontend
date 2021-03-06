import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import createUseRestful from '@/hooks/createUseRestful';
import styles from './style.less';

/* eslint react/no-multi-comp:0 */
const ProductTableList = () => {
  const result = createUseRestful<any>('/api/project/notice');
  const { data, error } = result.useSWRQuery();

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <div></div>
          </div>
          <div className={styles.tableListOperator}>
            <Button icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </div>
        </div>
        <div>{!data && <div>Loading ....</div>}</div>
        <div>{error}</div>
        <div>{data && <div> {JSON.stringify(data)}</div>}</div>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Form.create()(ProductTableList);
