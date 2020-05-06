import React, { useEffect, useState } from 'react';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { pushMessage } from 'services/game';
import { actionToMessage } from 'game/message';

export default () => {
  const [prevActionId, setPrevActionId] = useState(null);
  const { gameId, getMainPlayerName } = useGameState();
  const { lastPushedAction } = usePushAction();
  const mainPlayerName = getMainPlayerName();

  useEffect(() => {
    if (
      gameId &&
      mainPlayerName &&
      lastPushedAction &&
      lastPushedAction.id !== prevActionId
    ) {
      setPrevActionId(lastPushedAction.id);
      pushMessage(gameId, actionToMessage(lastPushedAction, mainPlayerName));
    }
  }, [lastPushedAction, mainPlayerName, gameId, prevActionId]);

  return <React.Fragment />;
};
