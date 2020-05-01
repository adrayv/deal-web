import React from 'react';
import { Link } from '@reach/router';

export default () => (
  <React.Fragment>
    <h1>home</h1>
    <Link to="/create">
      <button>Create Game</button>
    </Link>
    <Link to="/join-info">
      <button>Join Game</button>
    </Link>
    <Link to="/rules">
      <button>Rules</button>
    </Link>
  </React.Fragment>
);
