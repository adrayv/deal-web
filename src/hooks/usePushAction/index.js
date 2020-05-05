import React, { useContext, createContext, useState, useCallback } from 'react';
import uniqid from 'uniqid';

const Context = createContext();

const { Provider } = Context;

export const PushedActionsProvider = ({ children }) => {
  const [lastPushedAction, setLastPushed] = useState(null);

  const pushAction = useCallback(action => {
    setLastPushed({ id: uniqid(), ...action });
  }, []);

  return (
    <Provider value={{ lastPushedAction, pushAction }}>{children}</Provider>
  );
};

export default () => useContext(Context);
