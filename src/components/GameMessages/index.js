import React from 'react';
import View from './view';
import useGameMessages from 'hooks/useGameMessages';
import useGameState from 'hooks/useGameState';

export default () => {
  const { getMessage } = useGameMessages();
  const { getMainPlayerId } = useGameState();
  const mainPlayerId = getMainPlayerId();
  if (mainPlayerId) {
    const message = getMessage(mainPlayerId);
    if (message) {
      return <View message={message} />;
    }
  }
  return <React.Fragment />;
};
