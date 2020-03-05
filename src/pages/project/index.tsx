import React from 'react';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, List, Button, Typography } from 'antd';
import Link from 'umi/link';
import { useFormModal, useRestful } from '@/hooks';
import { PROJECT_API } from '@/services/resources';
import { Project } from '@/services/resources/models';
import styles from './index.less';
import CreateProjectFMC from './components/modules/CreateProjectFMC';

const { Paragraph } = Typography;

export default (): React.ReactNode => {
  const projectResource = useRestful<Project>(PROJECT_API);
  const { data } = projectResource.useSWRQuery();
  // const error = null;
  // const tablelist = ({ records: [] } as any) as ITableList;

  const createProjectModal = useFormModal(CreateProjectFMC, projectResource);

  const handleAddProject = () => {
    createProjectModal.create({}, { title: '创建工程' });
  };

  const handleEditProject = (record: Project) => {
    createProjectModal.edit(record, { title: '编辑工程' });
  };

  return (
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
                    <Link to={`/project/${item.id}/operation`}>数据看板</Link>,
                    <Link to={`/project/${item.id}/device`}>设备管理</Link>,
                    <Link to={`/project/${item.id}/develop`}>产品设计</Link>,
                  ]}
                >
                  <Card.Meta
                    avatar={<img alt="" className={styles.cardAvatar} src={item.logo} />}
                    title={
                      <div>
                        {item.name}
                        <SettingOutlined
                          onClick={() => handleEditProject(item)}
                          style={{ float: 'right' }}
                        ></SettingOutlined>
                      </div>
                    }
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
                <PlusOutlined /> 新增项目
              </Button>
            </List.Item>
          );
        }}
      />
    </div>
  );
};
