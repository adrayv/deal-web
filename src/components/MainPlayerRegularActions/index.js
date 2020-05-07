import React, { useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import useModal from 'hooks/useModal';
import PlayCashCard from 'components/PlayCashCard';
import usePushAction from 'hooks/usePushAction';
import { actionCreators } from 'game/core';
import PlayPropertyCard from 'components/PlayPropertyCard';
import PlayActionCard from 'components/PlayActionCard';

export default () => {
  const { setComponent } = useModal();
  const {
    isMainPlayersTurn,
    gameHasOpenTasks,
    getMainPlayer,
    playerId,
  } = useGameState();
  const mainPlayer = getMainPlayer();
  const { pushAction } = usePushAction();

  const endTurnHandler = useCallback(() => {
    pushAction(actionCreators.endTurn(playerId));
  }, [playerId, pushAction]);

  const playCashHandler = useCallback(() => {
    setComponent(<PlayCashCard />);
  }, [setComponent]);

  const playPropertyHandler = useCallback(() => {
    setComponent(<PlayPropertyCard />);
  }, [setComponent]);

  const playActionHandler = useCallback(() => {
    setComponent(<PlayActionCard />);
  }, [setComponent]);

  if (mainPlayer) {
    return (
      <View
        onEndTurn={endTurnHandler}
        onPlayCash={playCashHandler}
        onPlayProperty={playPropertyHandler}
        onPlayAction={playActionHandler}
        canInteract={isMainPlayersTurn() && !gameHasOpenTasks()}
      />
    );
  }
  return <React.Fragment />;
};
