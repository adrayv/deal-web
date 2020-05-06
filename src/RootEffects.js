import React from 'react';
import PushNewState from 'effects/PushNewState';
import PushMessage from 'effects/PushMessage';

export default () => (
  <>
    <PushNewState />
    <PushMessage />
  </>
);
