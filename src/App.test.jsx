import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import App from './App';
import { BindingStateProvider } from './BindingState.jsx';

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
    const demoContainer = screen.getByTestId('demo-container');
    expect(within(demoContainer).getByText('React Binding State Demo')).toBeInTheDocument();
  });

  it('renders UserProfile and Counter components', () => {
    render(<TestApp />);
    const demoContainer = screen.getByTestId('demo-container');
    expect(within(demoContainer).getByText('User Profile')).toBeInTheDocument();
    expect(within(demoContainer).getByText('Counter')).toBeInTheDocument();
  });

  it('increments and decrements the counter', () => {
    render(<TestApp />);
    const demoContainer = screen.getByTestId('demo-container');
    const incrementButton = within(demoContainer).getByText('Increment');
    const decrementButton = within(demoContainer).getByText('Decrement');
    const counterCard = within(demoContainer).getByText('Counter').closest('.card');
    const count = counterCard.querySelector('strong');

    expect(count.textContent).toBe('0');

    act(() => {
      fireEvent.click(incrementButton);
    });
    expect(count.textContent).toBe('1');

    act(() => {
      fireEvent.click(decrementButton);
    });
    expect(count.textContent).toBe('0');
  });

  it('updates the user name via two-way data binding', () => {
    render(<TestApp />);
    const demoContainer = screen.getByTestId('demo-container');
    const nameInput = within(demoContainer).getByDisplayValue('John Doe');
    const profileCard = within(demoContainer).getByText('User Profile').closest('.card');
    const nameDisplay = profileCard.querySelector('strong');

    expect(nameDisplay.textContent).toBe('John Doe');

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    });

    expect(nameDisplay.textContent).toBe('Jane Doe');
  });
});
