import React, { useContext, createContext, useState, useCallback } from 'react';

const Context = createContext();

const { Provider } = Context;

export const PushedActionsProvider = ({ children }) => {
  const [lastPushedAction, setLastPushed] = useState(null);

  const pushAction = useCallback(action => {
    setLastPushed(action);
  }, []);

  const removeAction = useCallback(() => {
    setLastPushed(null);
  }, []);

  return (
    <Provider value={{ lastPushedAction, pushAction, removeAction }}>
      {children}
    </Provider>
  );
};

export default () => useContext(Context);
