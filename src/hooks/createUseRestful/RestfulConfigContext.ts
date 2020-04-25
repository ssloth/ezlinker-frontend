import { createContext } from 'react';

interface IPagination {
  size: number;
  current: number;
}

export interface IConfig {
  pagination: IPagination;
}

export const defaultConfig: IConfig = {
  pagination: {
    size: 10,
    current: 0,
  },
};

const UseRestfulConfigContext = createContext<IConfig>(defaultConfig);
UseRestfulConfigContext.displayName = 'RestfulConfigContext';

export default UseRestfulConfigContext;
