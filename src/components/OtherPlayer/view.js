import React from 'react';
import styled from 'styled-components';
import { Button, Card } from 'antd';

const Layout = styled.div`
  display: grid;
  grid-gap: 5px;
`;

export default ({
  playerName,
  onCashClick,
  onHandClick,
  onPropertiesClick,
}) => (
  <div>
    <Card title={playerName} size="small">
      <Layout>
        <Button block type="primary" onClick={onCashClick}>
          View Cash
        </Button>
        <Button block type="primary" onClick={onHandClick}>
          View Hand
        </Button>
        <Button block type="primary" onClick={onPropertiesClick}>
          View Properties
        </Button>
      </Layout>
    </Card>
  </div>
);
