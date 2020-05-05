import React from 'react';
import { Select, Card, Button } from 'antd';

const { Option } = Select;

export default ({
  properties,
  selectedProperty,
  onSelectProperty,
  // sets,
  // selectedSet,
  // onSelectSet,
  canSubmit,
  onSubmit,
}) => (
  <Card
    title="Select a Property Card to play"
    extra={
      <Button type="primary" disabled={!canSubmit} onClick={onSubmit}>
        Play this Card
      </Button>
    }
  >
    <p>Select a property</p>
    <Select
      value={selectedProperty}
      style={{ width: '100%' }}
      onChange={onSelectProperty}
    >
      {properties.map(card => (
        <Option value={card.id}>
          {card.name} - {card.color}
        </Option>
      ))}
    </Select>
    {/* <p>Select a set to put this property in</p>
    <Select
      value={selectedSet}
      style={{ width: '100%' }}
      onChange={onSelectSet}
    >
      {sets.map((set, i) => (
        <Option value={i}>
          Set #{i + 1} {set.color}
        </Option>
      ))}
      <Option value={-1}>New Set</Option>
    </Select> */}
  </Card>
);
