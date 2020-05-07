import React from 'react';
import { Select, Card, Button } from 'antd';

const { Option } = Select;

export default ({
  actionCards,
  selectedActionCard,
  onSelectAction,
  canSubmit,
  onSubmit,
}) => (
  <Card
    title="Select an Action Card to play"
    extra={
      <Button type="primary" disabled={!canSubmit} onClick={onSubmit}>
        Play this Card
      </Button>
    }
  >
    <p>Select an Action</p>
    <Select
      value={selectedActionCard}
      style={{ width: '100%' }}
      onChange={onSelectAction}
    >
      {actionCards.map(card => (
        <Option value={card.id}>{card.name}</Option>
      ))}
    </Select>
  </Card>
);
