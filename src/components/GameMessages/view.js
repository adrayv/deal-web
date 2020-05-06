import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

const Layout = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export default ({ message }) => (
  <Layout>
    <Card>
      <p>{message}</p>
    </Card>
  </Layout>
);
