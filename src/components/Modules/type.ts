import { Props } from 'react';
import { IModule } from '@/typings/types';
import { Layout } from 'react-grid-layout';

export interface IPageLayout {
  id: number;
  pages: IPage[];
}

export interface IPage {
  name: string;
  visuals: IVisualBlock[];
}


export enum ModuleType {
  BUTTON = 'BUTTON',
  BUTTON_GROUP = 'BUTTON_GROUP',
  SWITCH = 'SWITCH',
  SWITCH_GROUP = 'SWITCH_GROUP',
  PROGRESS_BAR = 'PROGRESS_BAR',
  DATA_ENTITY = 'DATA_ENTITY',
  STREAM = 'STREAM',
}

export enum VisualType {
  // 双向通信控件
  BUTTON = 'BUTTON',
  SWITCH = 'SWITCH',
  PROGRESS_BAR = 'PROGRESS_BAR',
  STREAM = 'STREAM',

  // 图表控件
  TABLE = 'TABLE',
  BAR_CHART = 'BAR_CHART',
  LINE_CHART = 'LINE_CHART',
}

export interface IVisualBlock extends Props<any> {
  module: IModule; // 该视图归属的模块模板
  visual: VisualType; // 视图
  layout: Layout;
  state?: any; // 当前状态 如果是 图标类型的为列表
  record?: any[]; // 记录
}
