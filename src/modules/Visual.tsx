import React, { Props } from 'react';

interface IVisualBlock extends Props<any> {}

const VisualBlock = (props: IVisualBlock) => (
  <div style={{ border: '1px solid #acc' }} key={props.key}>
    {props.children}
  </div>
);

export default VisualBlock;
