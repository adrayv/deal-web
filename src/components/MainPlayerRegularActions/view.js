import React from 'react';
import styled from 'styled-components';
import { Card, Button } from 'antd';

const Layout = styled.div`
  display: grid;
  grid-gap: 5px;
`;

const CardWrapper = styled.div`
  position: relative;
`;

const Screen = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  width: 100%;
  height: 100%;
  z-index: 10;
  display: ${props => (props.isActive ? 'initial' : 'none')};
`;

export default ({ onEndTurn, onPlayProperty, onPlayCash, canInteract }) => (
  <CardWrapper>
    <Screen isActive={!canInteract} />
    <Card title="Regular Actions" size="small">
      <Layout>
        <Button type="primary" onClick={onPlayProperty}>
          Play a Property
        </Button>
        <Button type="primary" onClick={onPlayCash}>
          Play Cash
        </Button>
        <Button type="danger" onClick={onEndTurn}>
          End Turn
        </Button>
      </Layout>
    </Card>
  </CardWrapper>
);
