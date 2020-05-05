import React from 'react';
import { Select, Card, Button } from 'antd';

const { Option } = Select;

export default ({
  cards,
  selectedCashCardId,
  onSelectCard,
  canSubmit,
  onSubmit,
}) => (
  <Card
    title="Select a Cash Card to play"
    extra={
      <Button type="primary" disabled={!canSubmit} onClick={onSubmit}>
        Play this Card
      </Button>
    }
  >
    <Select
      value={selectedCashCardId}
      style={{ width: 120 }}
      onChange={onSelectCard}
    >
      {cards.map(card => (
        <Option value={card.id}>${card.value}</Option>
      ))}
    </Select>
  </Card>
);
