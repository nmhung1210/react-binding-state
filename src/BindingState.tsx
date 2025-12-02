import React, { createContext, useContext, useState, ReactNode, useRef, Context as ReactContext, useEffect } from 'react';

// A singleton context reference. This is a mutable object that will be updated
// by the Provider to ensure the hook consumes from the correct, innermost provider.
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
  const pidRef = useRef<number>(0);
  const proxyCache = useRef(new WeakMap()).current;
  const isApplyingArrayMethod = useRef(false);

  const scheduleUpdate = () => {
    if (pidRef.current) {
      cancelAnimationFrame(pidRef.current);
    }
    pidRef.current = requestAnimationFrame(() => {
      setState((currentState: T) => ({ ...currentState }));
    });
  };

  const createProxy = (target: any): any => {
    if (typeof target !== 'object' || target === null) {
      return target;
    }

    if (proxyCache.has(target)) {
      return proxyCache.get(target);
    }

    const handler: ProxyHandler<any> = {
      get(target, prop, receiver) {
        if (Array.isArray(target)) {
          const mutatingMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
          if (mutatingMethods.includes(prop as string)) {
            return (...args: any[]) => {
              isApplyingArrayMethod.current = true;
              try {
                const method = Array.prototype[prop as keyof Array<any>];
                // @ts-ignore
                const result = method.apply(target, args);
                scheduleUpdate();
                return result;
              } finally {
                isApplyingArrayMethod.current = false;
              }
            };
          }
        }

        const value = Reflect.get(target, prop, receiver);
        return createProxy(value);
      },
      set(target, prop, value, receiver) {
        const oldValue = Reflect.get(target, prop, receiver);
        if (Object.is(oldValue, value)) {
          return true;
        }

        const success = Reflect.set(target, prop, value, receiver);

        if (success && !isApplyingArrayMethod.current) {
          scheduleUpdate();
        }
        return success;
      },
    };

    const proxy = new Proxy(target, handler);
    proxyCache.set(target, proxy);
    return proxy;
  };

  const proxyState = createProxy(state);

  return <BindingContext value={proxyState}>{children}</BindingContext>;
}
