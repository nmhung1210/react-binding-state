import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BindingStateProvider } from './BindingState';

const initialState = {
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  counter: 0,
  theme: 'dark',
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BindingStateProvider initialState={initialState}>
      <App />
    </BindingStateProvider>
  </React.StrictMode>,
);
