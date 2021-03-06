import React from 'react';
import { Card, Button } from 'antd';

export default ({ onClick, numCardsToDraw }) => (
  <div>
    <Card size="small" title={`Draw ${numCardsToDraw} cards`}>
      <Button block type="primary" onClick={onClick}>
        Draw {numCardsToDraw} cards
      </Button>
    </Card>
  </div>
);
