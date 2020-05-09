import React from 'react';
import { Card, Button } from 'antd';
import SetCard from 'components/SetCard';

export default ({
  setToSurrender,
  attackerName,
  onConfirm,
  canSayNo,
  onSayNo,
}) => (
  <div>
    <Card size="small" title={'Set to be stolen from you'}>
      <p>
        {attackerName} is going to steal your {setToSurrender.color} set
      </p>
      <SetCard
        cards={setToSurrender.cards}
        color={setToSurrender.color}
        isComplete={setToSurrender.complete}
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
