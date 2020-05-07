import React from 'react';
import { Card, Button } from 'antd';
import { Select } from 'antd';
const { Option } = Select;

export default ({
  numCardsToDiscard,
  cards,
  onCardSelect,
  selectedCards,
  canSubmit,
  onSubmit,
}) => (
  <div>
    <Card size="small" title={`Discard cards`}>
      <p>You can't have more than 7 cards at the end of your turn</p>
      <p>Please discard {numCardsToDiscard} cards</p>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder={`Choose ${numCardsToDiscard} to discard`}
        value={selectedCards}
        onChange={onCardSelect}
      >
        {cards
          .map(card => {
            if (card.type === 'cash') {
              return <Option value={card.id}>${card.value}</Option>;
            } else if (card.type === 'property' || card.type === 'action') {
              return (
                <Option value={card.id}>
                  {card.name} - ${card.value}
                </Option>
              );
            } else return null;
          })
          .filter(e => e)}
      </Select>
      <Button block type="primary" onClick={onSubmit} disabled={!canSubmit}>
        Discard
      </Button>
    </Card>
  </div>
);
