import React from 'react';
import { Card, Button } from 'antd';
import { Select } from 'antd';
const { Option } = Select;

export default ({
  players,
  selectedPlayer,
  onPlayerSelect,
  canSubmit,
  onSubmit,
}) => (
  <div>
    <Card
      size="small"
      style={{ width: 350 }}
      title={'Select a player to charge $5'}
    >
      <Select
        style={{ width: '100%' }}
        placeholder={`Select a player`}
        value={selectedPlayer}
        onChange={onPlayerSelect}
      >
        {players.map(player => {
          return <Option value={player.id}>{player.name}</Option>;
        })}
      </Select>
      <Button block type="primary" onClick={onSubmit} disabled={!canSubmit}>
        Charge
      </Button>
    </Card>
  </div>
);
