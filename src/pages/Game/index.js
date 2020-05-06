import React from 'react';
import styled from 'styled-components';
import OtherPlayerList from 'components/OtherPlayerList';
import MainPlayer from 'components/MainPlayer';
import GameMessages from 'components/GameMessages';

const GameLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template: 1fr 2fr / 1fr;
  justify-items: center;
  background: #fefefe;
`;

export default () => {
  return (
    <GameLayout>
      <OtherPlayerList />
      <MainPlayer />
      <GameMessages />
    </GameLayout>
  );
};
