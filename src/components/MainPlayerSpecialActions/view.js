import React from 'react';
import DrawCards from 'components/DrawCards';
import DiscardCards from 'components/DiscardCards';
import SelectCardToSteal from 'components/SelectCardToSteal';
import SurrenderCard from 'components/SurrenderCard';
import SelectSetToSteal from 'components/SelectSetToSteal';
import SurrenderSet from 'components/SurrenderSet';

export default () => (
  <>
    <DrawCards />
    <DiscardCards />
    <SelectCardToSteal />
    <SurrenderCard />
    <SelectSetToSteal />
    <SurrenderSet />
  </>
);
