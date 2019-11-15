export interface IServerResult<Data = any> {
  appName: string;
  code: number;
  message: string;
  in18nMessage: string;
  data: Data;
}

export interface ITableList<Resource = any> {
  records: Resource[];
  total: number;
  size: number;
  current: number;
  orders: number;
  searchCount: boolean;
  pages: number;
}

export interface ITableListItem {
  id: string;
}
