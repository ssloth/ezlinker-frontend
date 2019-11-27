import { Avatar, List, Statistic } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import styles from './style.less';

interface IndexProps {
  dispatch: Dispatch<any>;
  currentUserLoading: boolean;
  projectLoading: boolean;
  activitiesLoading: boolean;
}

const ExtraContent: React.FC<{}> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="产品数" value={2} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="模块数" value={10} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="功能数" value={120} />
    </div>
  </div>
);

class Index extends Component<IndexProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectAndproductAndindex/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectAndproductAndindex/clear',
    });
  }

  renderActivities = (item: any) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key: any) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    return <PageHeaderWrapper extraContent={<ExtraContent />}></PageHeaderWrapper>;
  }
}

export default Index;
