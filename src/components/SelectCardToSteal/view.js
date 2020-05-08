import React from 'react';
import { Card, Button } from 'antd';
import { Select } from 'antd';
const { Option } = Select;

export default ({ canSubmit, onSubmit, cards, selectedCard, onCardSelect }) => (
  <div>
    <Card size="small" style={{ width: 350 }} title={'Select card to steal'}>
      <Select
        style={{ width: '100%' }}
        placeholder={`Choose a card to steal`}
        value={selectedCard}
        onChange={onCardSelect}
      >
        {cards.map(card => {
          return (
            <Option value={card.id}>
              {card.name} - {card.color} from player: {card.owner.name}
            </Option>
          );
        })}
      </Select>
      <Button block type="primary" onClick={onSubmit} disabled={!canSubmit}>
        Steal
      </Button>
    </Card>
  </div>
);
