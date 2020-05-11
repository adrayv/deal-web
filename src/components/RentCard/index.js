import React from 'react';
import { Card } from 'antd';

export default ({ name, colors, value }) => (
  <div>
    <Card>
      <p>${value}</p>
      <p>{name}</p>
      <p>COLORS</p>
      {name === 'rent-any' ? <p>any</p> : colors.map(color => <p>{color}</p>)}
    </Card>
  </div>
);
