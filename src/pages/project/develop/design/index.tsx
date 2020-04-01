import React, { useState } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Card, Row, Col } from 'antd';
import _ from 'lodash';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


function generateLayout() {
  return _.map(_.range(0, 25), (item, i) => {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05,
    };
  });
}

const generateDOM = (layouts: any[]) =>
  layouts.map((item, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={i}>
      {item.static ? (
        <span className="text" title="This item is static and cannot be removed or resized.">
          Static - {i}
        </span>
      ) : (
        <span className="text">{i}</span>
      )}
    </div>
  ));

const ProductDesign = () => {
  const [layout, setLayout] = useState();

  return (
    <Card bodyStyle={{ padding: 0 }}>
      <ResponsiveReactGridLayout className="layout" layouts={layout}>
        {generateDOM(generateLayout())}
      </ResponsiveReactGridLayout>
    </Card>
  );
};

export default ProductDesign;
