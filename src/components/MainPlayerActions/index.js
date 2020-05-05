import React, { useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import useModal from 'hooks/useModal';
import ViewMainPlayerHand from 'components/ViewMainPlayerHand';
import ViewMainPlayerCash from 'components/ViewMainPlayerCash';
import PlayCashCard from 'components/PlayCashCard';
import usePushAction from 'hooks/usePushAction';
import { actionCreators } from 'game/core';
import PlayPropertyCard from 'components/PlayPropertyCard';

export default () => {
  const { setComponent } = useModal();
  const { getMainPlayer, playerId } = useGameState();
  const mainPlayer = getMainPlayer();
  const { pushAction } = usePushAction();

  const endTurnHandler = useCallback(() => {
    pushAction(actionCreators.endTurn(playerId));
  }, [playerId, pushAction]);

  const viewHandHandler = useCallback(() => {
    setComponent(<ViewMainPlayerHand />);
  }, [setComponent]);

  const viewCashHander = useCallback(() => {
    setComponent(<ViewMainPlayerCash />);
  }, [setComponent]);

  const playCashHandler = useCallback(() => {
    setComponent(<PlayCashCard />);
  }, [setComponent]);

  const playPropertyHandler = useCallback(() => {
    setComponent(<PlayPropertyCard />);
  }, [setComponent]);

  if (mainPlayer) {
    const { name } = mainPlayer;
    return (
      <View
        onEndTurn={endTurnHandler}
        onPlayCash={playCashHandler}
        onPlayProperty={playPropertyHandler}
        onViewCash={viewCashHander}
        onViewHand={viewHandHandler}
        onViewProperties={() => alert(`${name} wants to view their properties`)}
      />
    );
  }
  return <React.Fragment />;
};
