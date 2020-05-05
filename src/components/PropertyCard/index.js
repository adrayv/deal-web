import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const Border = styled.div`
  border: 5px solid ${props => props.color};
`;

export default ({ name, color, value }) => (
  <Border color={color}>
    <Card>
      <p>${value}</p>
      <p>{name}</p>
    </Card>
  </Border>
);
