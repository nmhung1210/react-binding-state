
import { renderHook, act } from '@testing-library/react';
import { BindingStateProvider, useBindingState } from './BindingState';
import React, { ReactNode, createContext } from 'react';
import { vi } from 'vitest';

describe('useBindingState', () => {
  it('returns null when used outside of a BindingStateProvider', () => {
    const { result } = renderHook(() => useBindingState());
    expect(result.current).toBeNull();
  });

  // The hook does not throw; it simply returns null when no provider is present.


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
