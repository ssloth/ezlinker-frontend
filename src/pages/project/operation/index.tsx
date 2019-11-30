// import { Avatar, List, Statistic } from 'antd';
import React from 'react';

import classNames from 'classnames/bind';
import styles from './style.less';

const cx = classNames.bind(styles);

const Operation = (props: any) => <div className={cx('wrapper')}>{props.children}</div>;

export default Operation;
