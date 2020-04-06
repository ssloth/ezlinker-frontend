import React from 'react';
import { Tabs, Card } from 'antd';
import { ILayout, IVisual } from './type';
import VisualBlock from './Visual';

const { TabPane } = Tabs;

const renderVisual = (visual:IVisual) => <div></div>

const renderLayout = (layout: ILayout) => {
  const { pages } = layout;

  return (
    <Tabs>
      {pages.map(item => (
        <TabPane key={item.name}>
          <Card>
            {item.visuals.map(it => (
              <VisualBlock key={it.id}>

              </VisualBlock>
            ))}
          </Card>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default renderLayout;
