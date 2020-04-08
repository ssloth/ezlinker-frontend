import React from 'react';
import { VisualType } from './type';
import Table from './Visual/Table';
import { IVisualBlock } from './VisualBlock';

const tableMap = new Map<VisualType, any>([[VisualType.TABLE, Table]]);

const renderVisualBlock = (visulaBlock: IVisualBlock) => {
  const Block = tableMap.get(visulaBlock.visual);

  return <Block {...visulaBlock}></Block>;
};

export default renderVisualBlock;
