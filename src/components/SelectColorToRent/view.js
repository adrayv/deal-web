import React from 'react';
import { Card, Button } from 'antd';
import { Select } from 'antd';
const { Option } = Select;

export default ({
  canSubmit,
  onSubmit,
  colors,
  selectedColor,
  onColorSelect,
}) => (
  <div>
    <Card
      size="small"
      style={{ width: 350 }}
      title={'Select a color to charge rent for'}
    >
      <Select
        style={{ width: '100%' }}
        placeholder={`Choose a color`}
        value={selectedColor}
        onChange={onColorSelect}
      >
        {colors.map(color => {
          return <Option value={color}>{color}</Option>;
        })}
      </Select>
      <Button block type="primary" onClick={onSubmit} disabled={!canSubmit}>
        Choose Color
      </Button>
    </Card>
  </div>
);
