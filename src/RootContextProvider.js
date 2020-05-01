import React from 'react';
import { TempProvider } from 'hooks/useTempState';

export default ({ children }) => <TempProvider>{children}</TempProvider>;
