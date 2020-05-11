import React from 'react';
import { Card, Button } from 'antd';
import { Select } from 'antd';
const { Option } = Select;

export default ({
  amountOwed,
  attackerName,
  onGoBankrupt,
  canSayNo,
  onSayNo,
  cards,
  selectedCards,
  onCardSelect,
  canSubmit,
  onSubmit,
  runningTotal,
}) => (
  <div>
    <Card size="small" title={`Pay a Charge`}>
      <p>
        You owe ${amountOwed} to {attackerName}
      </p>
      <p>
        Total: ${runningTotal} out of {amountOwed}
      </p>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder={`Choose cards to surrender`}
        value={selectedCards}
        onChange={onCardSelect}
      >
        {cards
          .map(card => {
            if (card.type === 'cash') {
              return <Option value={card.id}>${card.value}</Option>;
            } else if (card.type === 'property') {
              return (
                <Option value={card.id}>
                  {card.name} - ${card.color} - ${card.value}
                </Option>
              );
            } else return null;
          })
          .filter(e => e)}
      </Select>
      <Button block type="danger" onClick={onGoBankrupt}>
        Go Bankrupt
      </Button>
      <Button block type="primary" onClick={onSayNo} disabled={!canSayNo}>
        Say No
      </Button>
      <Button block type="danger" onClick={onSubmit} disabled={!canSubmit}>
        Surrender
      </Button>
    </Card>
  </div>
);
