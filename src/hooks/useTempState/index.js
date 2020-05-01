import React, { useContext, createContext, useState } from 'react';

const Context = createContext();

const { Provider } = Context;

export const TempProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <Provider
      value={{
        gameStarted,
        setGameStarted,
      }}
    >
      {children}
    </Provider>
  );
};

export default () => useContext(Context);
