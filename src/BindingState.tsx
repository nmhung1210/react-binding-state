import React, { createContext, useContext, useState, ReactNode, Context as ReactContext, useMemo } from 'react';

export const BindingContext = createContext<ReactContext<any> | null>(null);
export function useBindingState<T = any>(): T {
  return useContext(BindingContext) as T;
}

interface BindingStateProviderProps<T extends object> {
  children: ReactNode;
  initialState: T;
}

export function BindingStateProvider<T extends object>({
  children,
  initialState,
}: BindingStateProviderProps<T>): React.ReactElement {
  const [state, setState] = useState<T>(initialState);

  const createProxy = (obj: any): any => {
    return new Proxy(obj, {
      set(target, prop, value) {
        target[prop as keyof T] = value;
        setState({ ...state });
        return true;
      },
      get(target, prop) {
        const value = target[prop as keyof T];
        if (typeof value === 'object' && value !== null) {
          return createProxy(value);
        }
        return value;
      },
    });
  };

  const stateMemo = useMemo(() => createProxy(state), [state]);
  return <BindingContext.Provider value={stateMemo}>{children}</BindingContext.Provider>;
}
