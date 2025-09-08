import React, { createContext, useContext, useState, ReactNode, useRef, Context as ReactContext, useEffect, act } from 'react';

// A singleton context reference. This is a mutable object that will be updated
// by the Provider to ensure the hook consumes from the correct, innermost provider.
const Context = {
  current: null as ReactContext<any> | null,
};

export function useBindingState<T = any>(): T {
  // The hook now reads from the singleton reference, which is guaranteed by the
  // provider to be the correct context for this part of the React tree.
  if (!Context.current) {
    throw new Error('useBindingState must be used within a BindingStateProvider');
  }
  const context = useContext(Context.current);
  if (context === null) {
    // This error means the hook is used in a component that is not a child of the provider.
    throw new Error('useBindingState must be used within a BindingStateProvider');
  }
  return context;
}

interface BindingStateProviderProps<T extends object> {
  children: ReactNode;
  initialState: T;
}

export function BindingStateProvider<T extends object>({
  children,
  initialState,
}: BindingStateProviderProps<T>): React.ReactElement {
  // Each provider instance gets its own unique context object, created only once.
  const contextRef = useRef<ReactContext<T | null> | null>(null);
  if (contextRef.current === null) {
    contextRef.current = createContext<T | null>(null);
  }

  // Before this provider renders, it sets itself as the "current" one.
  // We save the one that was current before to handle nesting and test cleanup.
  const previousContext = Context.current;
  Context.current = contextRef.current;

  // After this provider unmounts, we restore the previous context.
  // This is key for tests (unmounting between tests) and for nested providers.
  useEffect(() => {
    return () => {
      Context.current = previousContext;
    };
  }, [previousContext]);

  const [state, setState] = useState<T>(initialState);
  const pidRef = useRef<number>(0);
  const proxyCache = useRef(new WeakMap()).current;
  const isApplyingArrayMethod = useRef(false);

  const scheduleUpdate = () => {
    if (pidRef.current) {
      cancelAnimationFrame(pidRef.current);
    }
    pidRef.current = requestAnimationFrame(() => {
      act(() => {
        setState(currentState => ({ ...currentState }));
      });
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
  const Provider = (contextRef.current as ReactContext<T>).Provider;

  return <Provider value={proxyState}>{children}</Provider>;
}
