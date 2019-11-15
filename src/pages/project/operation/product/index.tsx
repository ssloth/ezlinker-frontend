import { Button, Card, Form } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import useRestful from '@/hook/useRestful';
import styles from './style.less';

/* eslint react/no-multi-comp:0 */
const ProductTableList = () => {
  const result = useRestful<any>('/api/project/notice');
  const { data, error } = result.query();

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <div></div>
          </div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary">
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
