import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import CashCard from 'components/CashCard';
import PropertyCard from 'components/PropertyCard';

const Layout = styled.div`
  & > * {
    margin-bottom: 10px;
  }
  width: 50vw;
  display: grid;
  grid-template: 1fr / repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 10px;
`;

export default ({ cards }) => (
  <Card title="Your Hand">
    <Layout>
      {cards.map(card => {
        if (card.type === 'cash') {
          return <CashCard value={card.value} />;
        } else {
          return (
            <PropertyCard
              value={card.value}
              name={card.name}
              color={card.color}
            />
          );
        }
      })}
    </Layout>
  </Card>
);
