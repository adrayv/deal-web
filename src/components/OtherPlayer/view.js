import React from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default ({ onClick, playerName }) => (
  <Button
    type="primary"
    shape="round"
    icon={<UserOutlined />}
    onClick={onClick}
  >
    {playerName}
  </Button>
);
