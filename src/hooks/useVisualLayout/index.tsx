import React, { useState } from 'react';
import { ControlPanel } from '@/components/Modules';

const useVisualLayout = ({ layout }) => {
  const [layouts, setLayouts] = useState<any[]>(layout);

  const render = () => (
    <ControlPanel onChange={(val: any) => console.log(val)} value={layouts as any[]}></ControlPanel>
  );

  return {
    addVisualBlock: {},
    removeVisualBlock: {},
    // setLayout: {},
    render,
  };
};

export default useVisualLayout;
