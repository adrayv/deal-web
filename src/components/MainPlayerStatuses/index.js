import React, { useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import useModal from 'hooks/useModal';
import ViewMainPlayerHand from 'components/ViewMainPlayerHand';
import ViewMainPlayerCash from 'components/ViewMainPlayerCash';
import ViewMainPlayerProperties from 'components/ViewMainPlayerProperties';

export default () => {
  const { setComponent } = useModal();
  const { getMainPlayer } = useGameState();
  const mainPlayer = getMainPlayer();

  const viewHandHandler = useCallback(() => {
    setComponent(<ViewMainPlayerHand />);
  }, [setComponent]);

  const viewCashHander = useCallback(() => {
    setComponent(<ViewMainPlayerCash />);
  }, [setComponent]);

  const viewPropertiesHandler = useCallback(() => {
    setComponent(<ViewMainPlayerProperties />);
  }, [setComponent]);

  if (mainPlayer) {
    return (
      <View
        onViewCash={viewCashHander}
        onViewHand={viewHandHandler}
        onViewProperties={viewPropertiesHandler}
      />
    );
  }
  return <React.Fragment />;
};
