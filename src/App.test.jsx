import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import App from './App';
import { BindingStateProvider, useBindingState } from './BindingState.jsx';

const TestApp = () => {
  const initialState = {
    user: {
      name: 'John Doe',
      profile: {
        email: 'john.doe@example.com',
      },
    },
    counter: 0,
  };

  return (
    <BindingStateProvider initialState={initialState}>
      <App />
    </BindingStateProvider>
  );
};

describe('App', () => {
  it('renders the App component', () => {
    render(<TestApp />);
    expect(screen.getAllByText('React Binding State Demo')[0]).toBeInTheDocument();
  });

  it('renders UserProfile and Counter components', () => {
    render(<TestApp />);
    expect(screen.getAllByText('User Profile')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Counter')[0]).toBeInTheDocument();
  });

  it('increments and decrements the counter', () => {
    render(<TestApp />);
    const incrementButton = screen.getAllByText('Increment')[0];
    const decrementButton = screen.getAllByText('Decrement')[0];
    const count = screen.getAllByText('Count:')[0].querySelector('strong');

    expect(count.textContent).toBe('0');

    fireEvent.click(incrementButton);
    expect(count.textContent).toBe('1');

    fireEvent.click(decrementButton);
    expect(count.textContent).toBe('0');
  });

  it('updates the user name via two-way data binding', () => {
    render(<TestApp />);
    const nameInput = screen.getByDisplayValue('John Doe');
    const nameDisplay = screen.getAllByText('Name:')[0].querySelector('strong');

    expect(nameDisplay.textContent).toBe('John Doe');

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

    expect(nameDisplay.textContent).toBe('Jane Doe');
  });
});
