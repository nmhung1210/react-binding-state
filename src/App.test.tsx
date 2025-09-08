import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import React from 'react';
import App, { AppState } from './App'; // Import AppState
import { BindingStateProvider } from './BindingState';

const TestApp = () => {
  const initialState: AppState = {
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    counter: 0,
    theme: 'dark',
  };

  return (
    <BindingStateProvider initialState={initialState}>
      <App />
    </BindingStateProvider>
  );
};

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the App component', () => {
    render(<TestApp />);
    expect(screen.getByText('React Binding State')).toBeInTheDocument();
  });

  it('renders UserProfile and Counter components', () => {
    render(<TestApp />);
    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('Counter')).toBeInTheDocument();
  });

  it('increments and decrements the counter', () => {
    render(<TestApp />);
    const incrementButton = screen.getByText('Increment');
    const decrementButton = screen.getByText('Decrement');
    
    expect(screen.getByText('0')).toBeInTheDocument();

    fireEvent.click(incrementButton);
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(decrementButton);
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('updates the user name and email', () => {
    render(<TestApp />);
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByDisplayValue('jane.doe@example.com')).toBeInTheDocument();
  });

  it('toggles the theme', () => {
    render(<TestApp />);
    const themeButton = screen.getByText('Switch to Light Theme');

    fireEvent.click(themeButton);
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByText('Switch to Dark Theme')).toBeInTheDocument();
  });
});
