import { ITableList } from '@/typings/server';

export const tableData2ProTableAdapter = async (data: ITableList) => ({
  pageSize: data.size,
  current: data.current,
  data: data.records,
});
