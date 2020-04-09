import React from 'react';
import { VisualType, IVisualBlock } from './type';
import Table from './Visual/Table';
import Switch from './Visual/Switch';

const tableMap = new Map<VisualType, any>([
  [VisualType.TABLE, Table],
  [VisualType.SWITCH, Switch],
]);

const renderVisualBlock = (visulaBlock: IVisualBlock) => {
  const Block = tableMap.get(visulaBlock.visual);

  return <Block {...visulaBlock}></Block>;
};


export default renderVisualBlock;
