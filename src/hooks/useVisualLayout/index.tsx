import React, { useState } from 'react';
import { ControlPanel } from '@/components/Modules';
import { IVisualBlock } from '@/components/Modules/VisualBlock';

const useVisualLayout = ({ layout }: any) => {
  const [layouts, setLayouts] = useState<any[]>(layout || []);

  const addVisualBlock = (visualBlock: IVisualBlock) => {
    setLayouts(layouts.concat(visualBlock));
  };

  const render = () => (
    <ControlPanel onChange={(val: any) => console.log(val)} value={layouts}></ControlPanel>
  );

  return {
    addVisualBlock,
    removeVisualBlock: {},
    // setLayout: {},
    render,
  };
};

export default useVisualLayout;
