import React, { useState, useCallback } from 'react';
import View from './view';
import { navigate } from '@reach/router';

export default () => {
  const [name, setName] = useState('');

  const canCreateGame = Boolean(name);

  const createGameHandler = useCallback(() => {
    if (canCreateGame) {
      alert(`Creating game with player: ${name}`);
      setName('');
      navigate(`/games/${name}`);
    }
  }, [canCreateGame, name]);

  return (
    <View
      onNameChange={setName}
      name={name}
      onCreateGame={createGameHandler}
      canCreateGame={canCreateGame}
    />
  );
};
