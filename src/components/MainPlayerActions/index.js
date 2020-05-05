import React, { useCallback } from 'react';
import styled from 'styled-components';
import View from './view';
import useGameState from 'hooks/useGameState';
import useModal from 'hooks/useModal';
import ViewMainPlayerHand from 'components/ViewMainPlayerHand';

const Temp = styled.div`
  width: 300px;
  height: 200px;
  background: red;
`;

export default () => {
  const { setComponent } = useModal();
  const { getMainPlayer } = useGameState();
  const mainPlayer = getMainPlayer();

  const endTurnHandler = useCallback(() => {
    setComponent(<Temp />);
  }, [setComponent]);

  const viewHandHandler = useCallback(() => {
    setComponent(<ViewMainPlayerHand />);
  }, [setComponent]);

  if (mainPlayer) {
    const { name } = mainPlayer;
    return (
      <View
        onEndTurn={endTurnHandler}
        onPlayCash={() => alert(`${name} wants to play cash`)}
        onPlayProperty={() => alert(`${name} wants to play property`)}
        onViewCash={() => alert(`${name} wants to view their cash`)}
        onViewHand={viewHandHandler}
        onViewProperties={() => alert(`${name} wants to view their properties`)}
      />
    );
  }
  return <React.Fragment />;
};
