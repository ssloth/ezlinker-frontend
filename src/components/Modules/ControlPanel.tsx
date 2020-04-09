import React, { useMemo } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { useControllableValue } from '@umijs/hooks';
import renderVisual from './render';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface IControlPanel {
  value: any[];
  onChange: Function;
}

const ControlPanel = (props: IControlPanel) => {
  const [value, handleChange] = useControllableValue(props);
  const layouts = useMemo(() => value.map((item: any) => item.layouts), [value]);

  const handleLayoutChange = (layout_: any) => {
    handleChange({ ...value, layout_ });
  };

  return (
    <ResponsiveReactGridLayout layouts={layouts} onLayoutChange={handleLayoutChange}>
      {value.map((visualBlock: any) => (
        <div key={visualBlock.key}>{renderVisual(visualBlock)}</div>
      ))}
    </ResponsiveReactGridLayout>
  );
};

export default ControlPanel;
