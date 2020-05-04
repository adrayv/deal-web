import React from 'react';
import styled from 'styled-components';
import MainPlayerActions from 'components/MainPlayerActions';

const Layout = styled.div`
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

export default ({ canInteract }) => (
  <Layout>
    <Screen isActive={!canInteract} />
    <MainPlayerActions />
  </Layout>
);
