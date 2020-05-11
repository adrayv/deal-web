import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import CashCard from 'components/CashCard';
import PropertyCard from 'components/PropertyCard';
import SetCard from 'components/SetCard';
import ActionCard from 'components/ActionCard';
import RentCard from 'components/RentCard';

const Layout = styled.div`
  & > * {
    margin-bottom: 10px;
  }
  width: 50vw;
  display: grid;
  grid-template: 1fr / repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 10px;
`;

export default ({ title, cards }) => (
  <Card title={title}>
    <Layout>
      {cards.map(card => {
        if (card.type === 'cash') {
          return <CashCard value={card.value} />;
        } else if (card.type === 'property') {
          return (
            <PropertyCard
              value={card.value}
              name={card.name}
              color={card.color}
            />
          );
        } else if (card.type === 'action') {
          return <ActionCard name={card.name} value={card.value} />;
        } else if (card.type === 'rent') {
          return (
            <RentCard
              name={card.name}
              value={card.value}
              colors={card.colors}
            />
          );
        } else {
          return (
            <SetCard
              color={card.color}
              isComplete={card.complete}
              cards={card.cards}
            />
          );
        }
      })}
    </Layout>
  </Card>
);
