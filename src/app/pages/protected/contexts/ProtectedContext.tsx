import * as React from 'react';

const ProtectedContext = React.createContext({});

export const ProtectedContextProvider: React.FC<{
  children: JSX.Element;
}> = props => {
  const contextValue = React.useMemo(() => ({}), []);

  return (
    <ProtectedContext.Provider value={contextValue}>
      {props.children}
    </ProtectedContext.Provider>
  );
};

export const useProtectedContext = () => React.useContext(ProtectedContext);
