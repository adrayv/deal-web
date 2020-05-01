import React from 'react';
import { navigate } from '@reach/router';
import View from './view';

export default () => {
  return (
    <View
      onCreateGame={() => navigate('/create')}
      onJoinGame={() => navigate('/join-info')}
      onRulesClick={() => navigate('/rules')}
    />
  );
};
