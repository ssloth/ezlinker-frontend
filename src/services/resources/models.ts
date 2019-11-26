/**
 * 与后端的modal层对应
 */
export interface Base {
  id: number;
  createTime: string;
  updateTime: string;
}

export interface Project extends Base {
  name: string;
  logo: string;
  userId: string;
  location: string;
  description: string;
}

export interface Product extends Base {
  projectId: string;
  description: string;
  name: string;
  logo: string;
  tags: string[];
  type: string;
  parameter: string;
}

export interface Feature extends Base {}

export enum MODULE_PROTOCOL {
  MQTT = 1,
}

export enum MODULE_TYPE {
  COMMON = 1,
}

export interface Module extends Base {
  name: string;
  description: string;
  model: string;
  type: MODULE_TYPE;
  protocol: MODULE_PROTOCOL;
  dataArea: string;
}

export interface Device extends Base {}
