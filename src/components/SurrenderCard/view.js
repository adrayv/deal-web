import React from 'react';
import { Card, Button } from 'antd';
import PropertyCard from 'components/PropertyCard';

export default ({
  cardToSurrender,
  attackerName,
  onConfirm,
  canSayNo,
  onSayNo,
}) => (
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
      <Button block type="primary" onClick={onSayNo} disabled={!canSayNo}>
        Say No
      </Button>
      <Button block type="danger" onClick={onConfirm}>
        Allow
      </Button>
    </Card>
  </div>
);
