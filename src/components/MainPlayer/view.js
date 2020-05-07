import React from 'react';
import styled from 'styled-components';
import MainPlayerRegularActions from 'components/MainPlayerRegularActions';
import MainPlayerStatuses from 'components/MainPlayerStatuses';
import MainPlayerSpecialActions from 'components/MainPlayerSpecialActions';

const Layout = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
`;

export default () => {
  return (
    <Layout>
      <MainPlayerRegularActions />
      <MainPlayerSpecialActions />
      <MainPlayerStatuses />
    </Layout>
  );
};
