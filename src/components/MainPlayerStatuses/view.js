import React from 'react';
import styled from 'styled-components';
import { Button, Card } from 'antd';

const Layout = styled.div`
  display: grid;
  grid-gap: 5px;
`;

export default ({ onViewHand, onViewProperties, onViewCash }) => (
  <div>
    <Card title="Statuses" size="small">
      <Layout>
        <Button type="primary" onClick={onViewHand}>
          View Hand
        </Button>
        <Button type="primary" onClick={onViewProperties}>
          View Properties
        </Button>
        <Button type="primary" onClick={onViewCash}>
          View Cash
        </Button>
      </Layout>
    </Card>
  </div>
);
