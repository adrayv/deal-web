import React, { useState, useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators } from 'game/core';
import useModal from 'hooks/useModal';

export default () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const {
    playerId,
    getMainPlayerPropertiesInHand,
    getMainPlayerSets,
  } = useGameState();
  const mainPlayerHandProperties = getMainPlayerPropertiesInHand();
  const mainPlayerSets = getMainPlayerSets();
  const { pushAction } = usePushAction();
  const { removeComponent } = useModal();

  const submitHandler = useCallback(() => {
    const cardToPlay = mainPlayerHandProperties.find(
      property => property.id === selectedProperty
    );
    if (cardToPlay) {
      pushAction(actionCreators.playCard(playerId, cardToPlay));
      removeComponent();
    }
  }, [
    selectedProperty,
    mainPlayerHandProperties,
    playerId,
    pushAction,
    removeComponent,
  ]);

  return (
    <View
      properties={mainPlayerHandProperties}
      selectedProperty={selectedProperty}
      onSelectProperty={setSelectedProperty}
      sets={mainPlayerSets}
      selectedSet={selectedSet}
      onSelectSet={setSelectedSet}
      canSubmit={Boolean(selectedProperty)}
      onSubmit={submitHandler}
    />
  );
};
