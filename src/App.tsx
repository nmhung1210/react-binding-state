import React from 'react';
import { useBindingState } from './BindingState';
import './App.css';

// Define the type for our application state
export interface AppState {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  counter: number;
  theme: 'dark' | 'light';
}

const UserProfile = () => {
  const state = useBindingState(); // Use the type

  return (
    <div className="card profile-card">
      <h2>User Profile</h2>
      <div className="info">
        <img src={state.user.avatar} alt="Avatar" className="avatar" />
        <div>
          <p><strong>{state.user.name}</strong></p>
          <p>{state.user.email}</p>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={state.user.name} onChange={(e) => (state.user.name = e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={state.user.email} onChange={(e) => (state.user.email = e.target.value)} />
      </div>
    </div>
  );
};

const Counter = () => {
  const state = useBindingState<AppState>(); // Use the type

  return (
    <div className="card counter-card">
      <h2>Counter</h2>
      <div className="count">{state.counter}</div>
      <div className="buttons">
        <button className="btn btn-primary" onClick={() => state.counter++}>Increment</button>
        <button className="btn btn-secondary" onClick={() => state.counter--}>Decrement</button>
      </div>
    </div>
  );
};

const App = () => {
  const state = useBindingState<AppState>(); // Use the type

  const toggleTheme = () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.style.setProperty('--background-start-rgb', state.theme === 'dark' ? '18, 18, 18' : '255, 255, 255');
    document.body.style.setProperty('--background-end-rgb', state.theme === 'dark' ? '38, 38, 38' : '224, 224, 224');
    document.body.style.setProperty('--foreground-rgb', state.theme === 'dark' ? '255, 255, 255' : '0, 0, 0');
  };

  return (
    <div className="app-container">
      <div className="theme-switcher">
        <button className="btn btn-secondary" onClick={toggleTheme}>
          Switch to {state.theme === 'dark' ? 'Light' : 'Dark'} Theme
        </button>
      </div>
      <header className="header">
        <h1>React Binding State</h1>
        <p>Two-way data binding for modern React</p>
      </header>
      <main className="main-content">
        <UserProfile />
        <Counter />
      </main>
    </div>
  );
};

export default App;
