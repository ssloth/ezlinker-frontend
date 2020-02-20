/**
 * 与后端的modal层对应
 */
export interface Base {
  id: number;
  createTime: string;
  updateTime: string;
}

export enum StructrueType {
  number,
  string,
  boolean,
  JSON,
}

export interface Structrue {
  type: StructrueType;
  field: string;
  description: string;
  defaultValue: string;
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

export interface Feature extends Base {
  productId: string;
  name: string;
  label: string;
  cmdKey: string;
  cmdValues: any;
}

export enum MODULE_PROTOCOL {
  MQTT = 1,
}

export enum MODULE_TYPE {
  COMMON = 1,
}

export enum MODULE_STATUS {
  DROPPED,
  ONLINE,
}

export interface ModuleTemplate extends Base {
  name: string;
  description: string;
  model: string;
  type: MODULE_TYPE;
  protocol: MODULE_PROTOCOL;
  dataArea: string;
}

export interface Module extends Base {
  name: string;
  description: string;
  model: string;
  type: MODULE_TYPE;
  protocol: MODULE_PROTOCOL;
  dataArea: string;
  status: 0 | 1;
  lastActiveTime: string;
}

export interface Device extends Base {
  sn: string;
  productId: string;
  description: string;
  name: string;
  logo: string;
  tags: string[];
  type: string;
  statuses: string;
  parameter: string;
  modules: Module[];
  features: Feature[];
}

export interface User extends Base {
  username: string;
  avatar: string;
  phone: string;
  email: string;
  realName: string;
  nickName: string;
  userProfileId: number;
  userType: number;
  lastLoginTime: string;
  lastLoginIp: string;
}
