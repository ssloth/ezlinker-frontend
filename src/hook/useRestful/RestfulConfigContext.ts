import { createContext } from 'react';

interface IPagination {
  size: number;
  current: number;
}

export interface IConfigInterface {
  pagination: IPagination;
}

export const defaultConfig: IConfigInterface = {
  pagination: {
    size: 10,
    current: 0,
  },
};

const UseRestfulConfigContext = createContext<IConfigInterface>(defaultConfig);
UseRestfulConfigContext.displayName = 'RestfulConfigContext';

export default UseRestfulConfigContext;
