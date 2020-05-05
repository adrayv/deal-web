import React, { useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import useModal from 'hooks/useModal';
import ViewOtherPlayerCash from 'components/ViewOtherPlayerCash';
import ViewOtherPlayerHand from 'components/ViewOtherPlayerHand';
import ViewOtherPlayerProperties from 'components/ViewOtherPlayerProperties';

export default ({ playerId }) => {
  const { getPlayerById } = useGameState();
  const player = getPlayerById(playerId);
  const { setComponent } = useModal();

  const cashClickHandler = useCallback(() => {
    setComponent(<ViewOtherPlayerCash playerId={playerId} />);
  }, [setComponent, playerId]);

  const handClickHandler = useCallback(() => {
    setComponent(<ViewOtherPlayerHand playerId={playerId} />);
  }, [setComponent, playerId]);

  const propertyClickHandler = useCallback(() => {
    setComponent(<ViewOtherPlayerProperties playerId={playerId} />);
  }, [setComponent, playerId]);

  if (player) {
    const { name } = player;
    return (
      <View
        playerName={name}
        onCashClick={cashClickHandler}
        onPropertiesClick={propertyClickHandler}
        onHandClick={handClickHandler}
      />
    );
  }
  return <React.Fragment />;
};
