import React from 'react';
import { Card } from 'antd';

export default ({ playerName, numCashCards }) => (
  <Card title={`${playerName}'s Cash`}>
    <p>
      {playerName} has {numCashCards} cash cards
    </p>
  </Card>
);
