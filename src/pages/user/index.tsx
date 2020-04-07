import React from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { useRestful, useFormModal } from '@/hooks';
import { IUser } from '@/services/resources/models';
import { MANAGEMENT_USER_API } from '@/services/resources/index';
import { tableData2ProTableAdapter } from '@/utils/adapter';
import CreateUserFMC from './components/modules/CreateUserFMC';

const UserManage = () => {
  const userResource = useRestful<IUser>(MANAGEMENT_USER_API);
  const createUserModal = useFormModal(CreateUserFMC, userResource, {
    title: '创建用户',
  });

  const handleCreateUser = () => createUserModal.create();

  const columns: ProColumns<IUser>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '操作',
      render: () => <a>操作</a>,
    },
  ];

  return (
    <>
      <ProTable
        headerTitle="用户管理"
        rowKey="key"
        size="middle"
        columns={columns}
        request={params => userResource.query(params).then(data => tableData2ProTableAdapter(data))}
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={handleCreateUser}>
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      // await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
      ></ProTable>
    </>
  );
};

export default UserManage;
