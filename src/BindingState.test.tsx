
import { renderHook, act } from '@testing-library/react';
import { BindingStateProvider, useBindingState, Context } from './BindingState';
import React, { ReactNode, createContext } from 'react';
import { vi } from 'vitest';

describe('useBindingState', () => {
  it('should throw an error when used outside of a BindingStateProvider', () => {
    // Suppress the expected error from appearing in the console
    const consoleErrorSpy = vi.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    expect(() => {
      renderHook(() => useBindingState());
    }).toThrow('useBindingState must be used within a BindingStateProvider');

    consoleErrorSpy.mockRestore();
  });

  it('should throw an error if the context is available but the hook is not in a child component', () => {
    // This simulates an edge case where a provider has been rendered before,
    // so `Context.current` is not null, but the hook is used outside of a tree.
    const consoleErrorSpy = vi.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    // Manually set a context to simulate a previously rendered provider
    Context.current = createContext<any>(null);

    expect(() => {
      renderHook(() => useBindingState());
    }).toThrow('useBindingState must be used within a BindingStateProvider');

    // Clean up the manually set context
    Context.current = null;
    consoleErrorSpy.mockRestore();
  });


    it('should return the initial state', () => {
        const initialState = { count: 0 };
        const wrapper = ({ children }: { children: ReactNode }) => (
        <BindingStateProvider initialState={initialState}>{children}</BindingStateProvider>
        );

        const { result } = renderHook(() => useBindingState(), { wrapper });

        expect(result.current.count).toBe(0);
    });

    it('should update the state when a value is changed', () => {
        const initialState = { count: 0 };
        const wrapper = ({ children }: { children: ReactNode }) => (
        <BindingStateProvider initialState={initialState}>{children}</BindingStateProvider>
        );

        const { result } = renderHook(() => useBindingState(), { wrapper });

        act(() => {
            result.current.count = 1;
        });

        expect(result.current.count).toBe(1);
    });

    it('should handle nested state changes', () => {
        const initialState = { user: { name: 'John' } };
        const wrapper = ({ children }: { children: ReactNode }) => (
        <BindingStateProvider initialState={initialState}>{children}</BindingStateProvider>
        );

        const { result } = renderHook(() => useBindingState(), { wrapper });

        act(() => {
            result.current.user.name = 'Jane';
        });

        expect(result.current.user.name).toBe('Jane');
    });

    it('should handle array mutations and trigger update', () => {
        const initialState = { list: [1, 2] };
        const wrapper = ({ children }: { children: ReactNode }) => (
        <BindingStateProvider initialState={initialState}>{children}</BindingStateProvider>
        );

        const { result } = renderHook(() => useBindingState(), { wrapper });

        act(() => {
        const pushResult = result.current.list.push(3);
        expect(pushResult).toBe(3); // push returns the new length
        });

        expect(result.current.list).toEqual([1, 2, 3]);

        act(() => {
            const popResult = result.current.list.pop();
            expect(popResult).toBe(3);
        });
        expect(result.current.list).toEqual([1, 2]);
    });

    it('should not trigger an update if the value is the same', () => {
        const initialState = { count: 0 };
        const wrapper = ({ children }: { children: ReactNode }) => (
        <BindingStateProvider initialState={initialState}>{children}</BindingStateProvider>
        );

        const { result } = renderHook(() => useBindingState(), { wrapper });

        act(() => {
        result.current.count = 0; // Set to the same value
        });

        expect(result.current.count).toBe(0);
    });
});
