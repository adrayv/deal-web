import React from 'react';

export default ({ gameUrl, onCopy }) => (
  <>
    <h2>The game URL is {gameUrl}</h2>
    <button onClick={onCopy}>copy</button>
  </>
);
