import React from 'react';
import { Card, List, Button, Icon, Typography } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Link from 'umi/link';
import styles from './index.less';
import { useFormModal, useRestful } from '@/hook';
import { PROJECT_API } from '@/services/resources';
import { Project } from '@/services/resources/models';
import { ITableList } from '@/typings/server';
import CreateProjectFMC from './components/modules/CreateProjectFMC';

const { Paragraph } = Typography;

export default (): React.ReactNode => {
  const peojectResource = useRestful<Project>(PROJECT_API);
  const { data, error } = peojectResource.useQuery();
  const tablelist = data as ITableList;

  const createProjectModal = useFormModal(CreateProjectFMC, '', {
    title: '创建产品',
  });

  const handleAddproject = () => {
    createProjectModal.show();
  };


  return (
    <PageHeaderWrapper>
      <div className={styles.cardList}>
        <List
          rowKey="id"
          dataSource={[{}, ...(tablelist ? tablelist.records : [])]}
          loading={!tablelist || !!error}
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          renderItem={(item: Project) => {
            if (item && item.id) {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <Link to="/projects/1/operation">运维</Link>,
                      <Link to="/projects/1/develop">开发</Link>,
                      <a key="option2">删除</a>,
                    ]}
                  >
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.logo} />}
                      title={<a>{item.name}</a>}
                      description={
                        <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                          {item.description}
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }
            return (
              <List.Item>
                <Button onClick={handleAddproject} type="dashed" className={styles.newButton}>
                  <Icon type="plus" /> 新增产品
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
    </PageHeaderWrapper>
  );
};
