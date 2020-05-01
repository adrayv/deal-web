import React from 'react';
import View from './view';

export default ({ gameId }) => {
  return (
    <View
      onCopy={() => alert('copied!')}
      gameUrl={`${process.env.REACT_APP_GAME_URL}/join-game/${gameId}`}
    />
  );
};
