import { bench, describe } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { BindingStateProvider, useBindingState } from './BindingState';

// --- BindingState setup ---
function TestComponentBS() {
  const state = useBindingState();
  return (
    <div>
      <p>{state.count}</p>
      <p>{state.nested.value}</p>
      <button onClick={() => state.count++}>Increment</button>
      <button onClick={() => state.nested.value++}>Increment Nested</button>
    </div>
  );
}

function AppBS() {
  return (
    <BindingStateProvider initialState={{ count: 0, nested: { value: 0 } }}>
      <TestComponentBS />
    </BindingStateProvider>
  );
}

// --- useState setup (baseline) ---
function TestComponentState() {
    const [count, setCount] = useState(0);
    const [nested, setNested] = useState({ value: 0});

    return (
        <div>
            <p>{count}</p>
            <p>{nested.value}</p>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
            <button onClick={() => setNested(n => ({ value: n.value + 1 }))}>Increment Nested</button>
        </div>
    )
}

describe('Initial Render', () => {
    bench('BindingState', () => {
        render(<AppBS />);
    });

    bench('useState', () => {
        render(<TestComponentState />);
    });
});


describe('Simple State Update', () => {
    bench('BindingState', () => {
        const { getByText } = render(<AppBS />);
        const button = getByText('Increment');
        for (let i = 0; i < 100; i++) {
            fireEvent.click(button);
        }
    });

    bench('useState', () => {
        const { getByText } = render(<TestComponentState />);
        const button = getByText('Increment');
        for (let i = 0; i < 100; i++) {
            fireEvent.click(button);
        }
    });
});

describe('Nested State Update', () => {
    bench('BindingState', () => {
        const { getByText } = render(<AppBS />);
        const button = getByText('Increment Nested');
        for (let i = 0; i < 100; i++) {
            fireEvent.click(button);
        }
    });

    bench('useState', () => {
        const { getByText } = render(<TestComponentState />);
        const button = getByText('Increment Nested');
        for (let i = 0; i < 100; i++) {
            fireEvent.click(button);
        }
    });
});
