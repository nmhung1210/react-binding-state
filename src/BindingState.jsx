import { createContext, useContext, useState, useMemo, useEffect } from 'react';

const BindingStateContext = createContext();

export function useBindingState() {
  return useContext(BindingStateContext);
}

export function BindingStateProvider({ children, initialState = {} }) {
  const [state, setState] = useState({ ...initialState });
  const createProxy = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        obj[key] = createProxy({ ...obj[key] });
      }
    }
    return new Proxy(obj, {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        setState({ ...state });
        return true;
      },
    });
  };
  return (
    <BindingStateContext.Provider value={createProxy(state)}>
      {children}
    </BindingStateContext.Provider>
  );
}
