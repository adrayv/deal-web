import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const Layout = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 10px;
`;

export default ({
  onEndTurn,
  onPlayProperty,
  onPlayCash,
  onViewHand,
  onViewProperties,
  onViewCash,
}) => (
  <Layout>
    <Button type="primary" onClick={onPlayProperty}>
      Play a Property
    </Button>
    <Button type="primary" onClick={onPlayCash}>
      Play Cash
    </Button>
    <Button type="primary" onClick={onViewHand}>
      View Hand
    </Button>
    <Button type="primary" onClick={onViewProperties}>
      View Properties
    </Button>
    <Button type="primary" onClick={onViewCash}>
      View Cash
    </Button>
    <Button type="danger" onClick={onEndTurn}>
      End Turn
    </Button>
  </Layout>
);
