import React from 'react';
import DrawCards from 'components/DrawCards';
import DiscardCards from 'components/DiscardCards';
import SelectCardToSteal from 'components/SelectCardToSteal';
import SurrenderCard from 'components/SurrenderCard';

export default () => (
  <>
    <DrawCards />
    <DiscardCards />
    <SelectCardToSteal />
    <SurrenderCard />
  </>
);
