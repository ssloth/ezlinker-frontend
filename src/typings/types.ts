import { VisualType, ModuleType } from '../components/Modules/type';
/**
 * 与后端的modal层对应
 */
export interface IBase {
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

export interface IStructrue {
  type: StructrueType;
  field: string;
  description: string;
  defaultValue: string;
}

export interface IProject extends IBase {
  name: string;
  logo: string;
  userId: string;
  location: string;
  description: string;
}

export interface IProduct extends IBase {
  projectId: string;
  description: string;
  name: string;
  logo: string;
  tags: string[];
  type: string;
  parameter: string;
}

export enum ModuleProtocolType {
  MQTT = 1,
}

export enum ModuleStatusType {
  DROPPED,
  ONLINE,
}

export interface IModuleTemplate extends IBase {
  name: string;
  description: string;
  icon: string;
  model: string;
  type: ModuleType;
  protocol: ModuleProtocolType;
  dataAreas: string;
}

export interface IModule extends IBase {
  name: string;
  description: string;
  model: string;
  type: ModuleType;
  protocol: ModuleProtocolType;
  dataAreas: IStructrue[];
  icon: string;
  visual: VisualType[];
  status: 0 | 1;
  lastActiveTime: string;
}

export interface IDevice extends IBase {
  sn: string;
  productId: string;
  description: string;
  name: string;
  logo: string;
  tags: string[];
  type: string;
  statuses: string;
  parameter: string;
  modules: IModule[];
}

export interface IUser extends IBase {
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
