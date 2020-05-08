import React from 'react';
import { Card, Button } from 'antd';
import { Select } from 'antd';
const { Option } = Select;

export default ({ canSubmit, onSubmit, sets, selectedSet, onSetSelect }) => (
  <div>
    <Card size="small" style={{ width: 300 }} title={'Select set to steal'}>
      <Select
        style={{ width: '100%' }}
        placeholder={`Choose a set to steal`}
        value={selectedSet}
        onChange={onSetSelect}
      >
        {sets.map(set => {
          return (
            <Option value={set.id}>
              {set.color} from player: {set.owner.name}
            </Option>
          );
        })}
      </Select>
      <Button block type="primary" onClick={onSubmit} disabled={!canSubmit}>
        Steal
      </Button>
    </Card>
  </div>
);
