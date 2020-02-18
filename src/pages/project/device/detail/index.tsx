import React from 'react';
import ProTable from '@ant-design/pro-table';
import { get } from 'lodash';
import { useAsync } from '@umijs/hooks';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useRestful } from '@/hooks';
import { DEVICES_DATA_API } from '@/services/resources/index';
import { tableData2ProTableAdapter } from '@/utils/adapter';
import { queryDataStructureByDeviceId } from '@/services/device';

interface IResult {
  parameter: any[];
  modules: any[];
}

const structure2columnsAdapter = (data: IResult | undefined) => {
  const baseField = [{ title: '时间', dataIndex: 'createTime' }];
  if (!data) {
    return {
      device: baseField,
      modules: baseField,
    };
  }
  const device = data.parameter
    .map((item: any) => ({
      title: item.description,
      dataIndex: `data.${item.field}`,
    }))
    .concat(baseField);

  const modules = data.modules.map((item: any) => ({
    name: item.module,
    columns: item.structure
      .map((it: any) => ({
        title: it.description,
        dataIndex: `data.${it.field}`,
      }))
      .concat(baseField),
  }));

  return {
    device,
    modules,
  };
};

const getModules = (data: IResult | undefined) => {
  if (!data) return [];
  return data.modules.map((item: any) => ({ tab: item.name, path: `module/${item.field}` }));
};

const DeviceDetail = (props: any) => {
  const did = get(props, 'match.params.did');
  const { data: deviceDataStructure } = useAsync<any>(() => queryDataStructureByDeviceId(did));
  const deviceDataResource = useRestful<any>(DEVICES_DATA_API);

  const columns = structure2columnsAdapter(deviceDataStructure);
  const modules = getModules(deviceDataStructure);

  const headerTabList = [
    {
      tab: '设备数据',
      path: 'module/master',
    },
  ].concat(modules);

  return (
    <PageHeaderWrapper tabList={headerTabList}>
      <ProTable
        headerTitle="设备数据"
        rowKey="key"
        columns={columns.device || []}
        request={params =>
          deviceDataResource.query({ ...params, did }).then(data => tableData2ProTableAdapter(data))
        }
        // toolBarRender={(action, { selectedRows }) => [
        //   // <Button icon="plus" type="primary" onClick={handleCreateUser}>
        //   //   新建
        //   // </Button>,
        //   // selectedRows && selectedRows.length > 0 && (
        //   //   <Dropdown
        //   //     overlay={
        //   //       <Menu
        //   //         onClick={async e => {
        //   //           if (e.key === 'remove') {
        //   //             // await handleRemove(selectedRows);
        //   //             action.reload();
        //   //           }
        //   //         }}
        //   //         selectedKeys={[]}
        //   //       >
        //   //         <Menu.Item key="remove">批量删除</Menu.Item>
        //   //         <Menu.Item key="approval">批量审批</Menu.Item>
        //   //       </Menu>
        //   //     }
        //   //   >
        //   //     <Button>
        //   //       批量操作 <Icon type="down" />
        //   //     </Button>
        //   //   </Dropdown>
        //   // ),
        // ]}
      ></ProTable>

      {/* <Card className={styles.header} style={{ marginBottom: 6 }} bodyStyle={{ padding: 12 }}>
        <div className={styles.right}>
          <Button onClick={handleCreateUser} type="primary">
            创建用户
          </Button>
        </div>
      </Card>
      <Card bodyStyle={{ padding: 0 }}>
        <Table rowKey="id" columns={columns} {...tableProps}></Table>
      </Card> */}
    </PageHeaderWrapper>
  );
};

export default DeviceDetail;
