import React from 'react';
import { Card } from 'antd';

export default ({ name, value }) => (
  <Card>
    <p>${value}</p>
    <p>{name}</p>
  </Card>
);
