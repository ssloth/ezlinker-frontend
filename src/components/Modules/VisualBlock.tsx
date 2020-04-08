import React, { Props } from 'react';
import { IModule } from '@/typings/types';
import { VisualType } from './type';

export interface IVisualBlock extends Props<any> {
  module: IModule; // 该视图归属的模块模板
  visual: VisualType; // 视图
  state: any; // 当前状态 如果是 图标类型的为列表
  record: any[]; // 记录
}

const VisualBlock = (props: IVisualBlock) => (
  <div style={{ border: '1px solid #acc' }} key={props.key}>
    {props.children}
  </div>
);

export default VisualBlock;
