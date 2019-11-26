import React from 'react';
import { List, Button } from 'antd';
// import classNames from 'classnames/bind';
import { useRestful, useFormDrawer } from '@/hook';
import { Module } from '@/services/resources/models';
import { MODULES_API } from '@/services/resources/index';
// import styles from './OperationProductDC.less';
// import { useDrawer } from '@/hook';
import CreateModuleDC from './CreateModuleFDC';

// const cx = classNames.bind(styles);

interface IOperationProductDCProps {
  productId: string;
}

const OperationProductDC = (props: IOperationProductDCProps) => {
  const { productId } = props;
  const module = useRestful<Module>(MODULES_API);
  const { data } = module.useQuery({ productId });

  const createDrawer = useFormDrawer(CreateModuleDC, module, {
    title: '创建模块',
    width: 300,
  });

  const handleAddModule = () => {
    createDrawer.create({
      productId,
    });
  };

  const handleEditModule = (record: Module) => {
    createDrawer.edit(record);
  };

  return (
    <div>
      <Button
        onClick={handleAddModule}
        type="dashed"
        style={{ width: '100%', marginBottom: 8 }}
        icon="plus"
      >
        创建模块
      </Button>
      <List
        size="large"
        rowKey="id"
        loading={!data}
        // pagination={paginationProps}
        dataSource={data && data.records}
        renderItem={item => (
          <List.Item actions={[]}>
            <List.Item.Meta
              // avatar={<Avatar src={item.logo} shape="square" size="large" />}
              title={<span>{item.name}</span>}
              description={item.description}
            />
            <div>
              <a onClick={() => handleEditModule(item)}>操作</a>
            </div>
          </List.Item>
        )}
      />
      {createDrawer.render()}
    </div>
  );
};

export default OperationProductDC;
