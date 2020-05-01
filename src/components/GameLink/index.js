import React from 'react';
import View from './view';

export default ({ gameId }) => {
  return (
    <View
      onCopy={() => alert('copied!')}
      gameUrl={`https://some-url.com/${gameId}`}
    />
  );
};
