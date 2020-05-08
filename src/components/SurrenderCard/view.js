import React from 'react';
import { Card, Button } from 'antd';
import PropertyCard from 'components/PropertyCard';

export default ({ cardToSurrender, attackerName, onConfirm }) => (
  <div>
    <Card size="small" title={'Card to be stolen from you'}>
      <p>
        {attackerName} is going to steal {cardToSurrender.name} from you
      </p>
      <PropertyCard
        name={cardToSurrender.name}
        color={cardToSurrender.color}
        value={cardToSurrender.value}
      />
      <Button block type="primary" onClick={onConfirm}>
        Confirm
      </Button>
    </Card>
  </div>
);
