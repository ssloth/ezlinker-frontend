import React from 'react';
import { List, Avatar, Button } from 'antd';
// import classNames from 'classnames/bind';
import { useRestful } from '@/hook';
import { Moudle } from '@/services/resources/models';
import { MODULES_API } from '@/services/resources/index';
// import styles from './OperationProductContent.less';

// const cx = classNames.bind(styles);

interface IOperationProductContentProps {
  productId: string;
}

const OperationProductContent = (props: IOperationProductContentProps) => {
  const { productId } = props;
  const module = useRestful<Moudle>(MODULES_API);

  const { data } = module.useQuery({ productId });

  const handleAddModule = () => {};

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
