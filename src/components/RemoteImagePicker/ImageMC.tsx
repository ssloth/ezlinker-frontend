import React from 'react';
import classNames from 'classnames/bind';
import styles from './ImageMC.less';

const cx = classNames.bind(styles);

const ImageMC = ({
  urls,
  onChange,
  value,
}: {
  urls: string[];
  onChange: Function;
  value: string;
}) => (
  <div className={styles.wrapper}>
    {urls.map(item => (
      <div
        key={item}
        onClick={() => onChange(item)}
        className={cx('icon', {
          active: item === value,
        })}
      >
        <img alt="" className={cx('icon-font')} src={item}></img>
      </div>
    ))}
  </div>
);

export default ImageMC;
