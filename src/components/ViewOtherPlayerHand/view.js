import React from 'react';
import { Card } from 'antd';

export default ({ playerName, numCards }) => (
  <Card title={`${playerName}'s hand`}>
    <p>
      {playerName} has {numCards} cards in their hand
    </p>
  </Card>
);
