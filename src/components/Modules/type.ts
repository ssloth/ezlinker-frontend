export interface ILayout {
  id: number;
  pages: IPage[];
}

export interface IPage {
  name: string;
  visuals: IVisual[];
}

export interface IVisual {
  id: string;
  moduleId: string;
  content: any;
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
