import React from 'react';
import DrawCards from 'components/DrawCards';
import DiscardCards from 'components/DiscardCards';
import SelectCardToSteal from 'components/SelectCardToSteal';
import SurrenderCard from 'components/SurrenderCard';
import SelectSetToSteal from 'components/SelectSetToSteal';
import SurrenderSet from 'components/SurrenderSet';
import PayCharge from 'components/PayCharge';
import SelectPlayerToPayDebt from 'components/SelectPlayerToPayDebt';
import SelectColorToRent from 'components/SelectColorToRent';
import SelectPlayerAndColorToRent from 'components/SelectPlayerAndColorToRent';

export default () => (
  <>
    <DrawCards />
    <DiscardCards />
    <SelectCardToSteal />
    <SurrenderCard />
    <SelectSetToSteal />
    <SurrenderSet />
    <SelectPlayerToPayDebt />
    <SelectColorToRent />
    <SelectPlayerAndColorToRent />
    <PayCharge />
  </>
);
