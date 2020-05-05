import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const Border = styled.div`
  border: 5px solid ${props => props.color};
`;

export default ({ cards, color, isComplete }) => (
  <Border color={color}>
    <Card>
      {isComplete ? 'Complete' : 'Not Complete'}
      <p>cards in this set:</p>
      {cards.map(card => (
        <p>{card.name}</p>
      ))}
    </Card>
  </Border>
);
