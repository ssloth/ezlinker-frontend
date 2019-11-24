import React from 'react';
import { List, Avatar } from 'antd';

const OperationProductContent = (props: any) => {
  const { list } = props;
  return (
    <div>
      <List
        size="large"
        rowKey="id"
        // pagination={paginationProps}
        dataSource={list && list.records}
        renderItem={item => (
          <List.Item actions={[]}>
            <List.Item.Meta
              avatar={<Avatar src={item.logo} shape="square" size="large" />}
              title={<span>{item.name}</span>}
              description={item.description}
            />
            <div>
              <a>操作</a>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default OperationProductContent;
