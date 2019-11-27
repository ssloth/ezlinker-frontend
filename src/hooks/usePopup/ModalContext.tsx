import { createContext } from 'react';

interface IPagination {
  pageSize: number;
  pageNo: number;
}

export interface IConfigInterface {
  pagination: IPagination;
}

export const defaultConfig: IConfigInterface = {
  pagination: {
    pageSize: 10,
    pageNo: 0,
  },
};

const OwnModalContext = createContext<IConfigInterface>(defaultConfig);
OwnModalContext.displayName = 'OwnModalContext';

export default OwnModalContext;
