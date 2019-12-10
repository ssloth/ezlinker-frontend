import React from 'react';
import { Card, List, Button, Icon, Typography } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Link from 'umi/link';
import styles from './index.less';
import { useFormModal, useRestful } from '@/hooks';
import { PROJECT_API } from '@/services/resources';
import { Project } from '@/services/resources/models';
import CreateProjectFMC from './components/modules/CreateProjectFMC';

const { Paragraph } = Typography;

export default (): React.ReactNode => {
  const projectResource = useRestful<Project>(PROJECT_API);
  const { data } = projectResource.useSWRQuery();
  // const error = null;
  // const tablelist = ({ records: [] } as any) as ITableList;

  const createProjectModal = useFormModal(CreateProjectFMC, projectResource, {
    title: '创建产品',
  });

  const handleAddProject = () => {
    createProjectModal.show();
  };

  const handleEditProject = (record: Project) => {
    createProjectModal.edit(record);
  };

  return (
    <PageHeaderWrapper>
      <div className={styles.cardList}>
        <List
          rowKey="id"
          dataSource={[{} as Project, ...(data ? data.records : [])]}
          loading={!data}
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          renderItem={(item: Project) => {
            if (item && item.id) {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <Link to={`/project/${item.id}/operation`}>运维</Link>,
                      <Link to={`/project/${item.id}/device`}>管理</Link>,
                      <Link to={`/project/${item.id}/develop`}>开发</Link>,
                      <a onClick={() => handleEditProject(item)}>操作</a>,
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
                <Button onClick={handleAddProject} type="dashed" className={styles.newButton}>
                  <Icon type="plus" /> 新增项目
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
    </PageHeaderWrapper>
  );
};
