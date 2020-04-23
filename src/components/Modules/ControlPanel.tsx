import React, { useMemo } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { useControllableValue } from '@umijs/hooks';
import renderVisual from './render';
import { IVisualBlock } from './type';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface IControlPanel {
  value: any[];
  onChange: Function;
}

const ControlPanel = (props: IControlPanel) => {
  const [value, handleChange] = useControllableValue<IVisualBlock[]>(props);
  const layouts = useMemo(() => value?.map(item => item.layout || []), [value]);

  const handleLayoutChange = (layout_: any) => {
    const result = value?.reduce(
      (acc, val) =>
        (val.layout.i === layout_.i ? acc.concat({ ...val, layout: layout_ }) : acc.concat(val)),
      [],
    );
    handleChange(result);
  };

  return (
    <ResponsiveReactGridLayout layouts={layouts} onLayoutChange={handleLayoutChange}>
      {value?.map((visualBlock: any) => (
        <div key={visualBlock.key}>{renderVisual(visualBlock)}</div>
      ))}
    </ResponsiveReactGridLayout>
  );
};

export default ControlPanel;
