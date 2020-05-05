import React from 'react';
import CardList from 'components/CardList';

export default ({ playerName, playerSets }) => (
  <CardList title={`${playerName}'s Properties`} cards={playerSets} />
);
