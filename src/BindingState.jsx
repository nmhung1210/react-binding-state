import { createContext, useContext, useState, useMemo } from 'react';

const BindingStateContext = createContext();

export function useBindingState() {
  return useContext(BindingStateContext);
}

export function BindingStateProvider({ children, initialState = {} }) {
  const [state, setState] = useState(initialState);
  let pid;
  const scheduleUpdate = () => {
    if (pid) {
      cancelAnimationFrame(pid);
    }
    pid = requestAnimationFrame(() => {
      setState({...state});
    });
  };
  const createProxy = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        obj[key] = createProxy({...obj[key]});
      }
    }
    return new Proxy(obj, {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        scheduleUpdate();
        return true;
      },
    });
  };
  const stateProxy = useMemo(() => createProxy(initialState));
  return (
    <BindingStateContext.Provider value={stateProxy}>
      {children}
    </BindingStateContext.Provider>
  );
}
