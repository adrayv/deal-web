import React from 'react';
import styled from 'styled-components';
import OtherPlayer from 'components/OtherPlayer';

const Layout = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 10px;
`;

export default ({ playerIds }) => (
  <Layout>
    {playerIds.map(id => (
      <OtherPlayer playerId={id} />
    ))}
  </Layout>
);
