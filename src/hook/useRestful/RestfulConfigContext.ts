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

const UseRestfulConfigContext = createContext<IConfigInterface>(defaultConfig);
UseRestfulConfigContext.displayName = 'RestfulConfigContext';

export default UseRestfulConfigContext;
