import React, { useContext, createContext, useState, useCallback } from 'react';

const Context = createContext();

const { Provider } = Context;

export const ModalProvider = ({ children }) => {
  const [component, setComponent] = useState(null);

  const removeComponent = useCallback(() => {
    setComponent(null);
  }, []);

  return (
    <Provider
      value={{
        component,
        setComponent,
        removeComponent,
      }}
    >
      {children}
    </Provider>
  );
};

export default () => useContext(Context);
