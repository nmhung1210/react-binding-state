import { bench, describe, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import React, { useState } from 'react';
import { BindingStateProvider, useBindingState } from './BindingState';

// --- Heavy initial state ---
const getHeavyInitialState = () => ({
  count: 0,
  text: 'initial text',
  items: Array.from({ length: 100 }, (_, i) => ({ id: i, value: `item-${i}` })),
  config: {
    enabled: true,
    theme: 'dark',
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      preferences: {
        notifications: true,
        language: 'en',
      },
    },
  },
  nested: {
    level1: {
      level2: {
        level3: {
          value: 0,
        },
      },
    },
  },
});

// --- BindingState setup ---
function TestComponentBS() {
  const state = useBindingState();
  return (
    <div>
      <p>{state.count}</p>
      <p>{state.nested.level1.level2.level3.value}</p>
      <button data-testid="bs-increment" onClick={() => state.count++}>Increment</button>
      <button data-testid="bs-increment-deep" onClick={() => state.nested.level1.level2.level3.value++}>Increment Deeply Nested</button>
      <button data-testid="bs-update-array" onClick={() => state.items[50].value = 'updated'}>Update Array Item</button>
    </div>
  );
}

function AppBS() {
  return (
    <BindingStateProvider initialState={getHeavyInitialState()}>
      <TestComponentBS />
    </BindingStateProvider>
  );
}

// --- useState setup (baseline) ---
function TestComponentState() {
    const [state, setState] = useState(getHeavyInitialState());

    const increment = () => {
        setState(s => ({ ...s, count: s.count + 1 }));
    };

    const incrementDeeplyNested = () => {
        setState(s => ({
            ...s,
            nested: {
                ...s.nested,
                level1: {
                    ...s.nested.level1,
                    level2: {
                        ...s.nested.level1.level2,
                        level3: {
                            ...s.nested.level1.level2.level3,
                            value: s.nested.level1.level2.level3.value + 1
                        }
                    }
                }
            }
        }));
    };

    const updateArrayItem = () => {
        setState(s => {
            const newItems = [...s.items];
            newItems[50] = { ...newItems[50], value: 'updated' };
            return { ...s, items: newItems };
        });
    };

    return (
        <div>
            <p>{state.count}</p>
            <p>{state.nested.level1.level2.level3.value}</p>
            <button data-testid="state-increment" onClick={increment}>Increment</button>
            <button data-testid="state-increment-deep" onClick={incrementDeeplyNested}>Increment Deeply Nested</button>
            <button data-testid="state-update-array" onClick={updateArrayItem}>Update Array Item</button>
        </div>
    )
}

describe('Initial Render with Heavy State', () => {
    afterEach(cleanup)
    bench('BindingState', () => {
        render(<AppBS />);
    });

    bench('useState', () => {
        render(<TestComponentState />);
    });
});

describe('State Update Benchmarks', () => {
    const { getByTestId } = render(
        <>
            <AppBS />
            <TestComponentState />
        </>
    );

    const buttonBS_simple = getByTestId('bs-increment');
    const buttonState_simple = getByTestId('state-increment');
    const buttonBS_deep = getByTestId('bs-increment-deep');
    const buttonState_deep = getByTestId('state-increment-deep');
    const buttonBS_array = getByTestId('bs-update-array');
    const buttonState_array = getByTestId('state-update-array');

    describe('Heavy Simple State Update', () => {
        bench('BindingState', () => {
            fireEvent.click(buttonBS_simple);
        });

        bench('useState', () => {
            fireEvent.click(buttonState_simple);
        });
    });

    describe('Heavy Deeply Nested State Update', () => {
        bench('BindingState', () => {
            fireEvent.click(buttonBS_deep);
        });

        bench('useState', () => {
            fireEvent.click(buttonState_deep);
        });
    });

    describe('Heavy Array Item Update', () => {
        bench('BindingState', () => {
            fireEvent.click(buttonBS_array);
        });

        bench('useState', () => {
            fireEvent.click(buttonState_array);
        });
    });
});
