import React from 'react';
import { useBindingState } from './BindingState';
import './App.css';

function UserProfile() {
  const state = useBindingState();

  return (
    <div className="card">
      <h2>User Profile</h2>
      <p>Name: <strong>{state.user.name}</strong></p>
      <p>Email: <strong>{state.user.profile.email}</strong></p>
      <input
        type="text"
        value={state.user.name}
        onChange={(e) => {
          state.user.name = e.target.value;
        }}
      />
    </div>
  );
}

function Counter() {
    const state = useBindingState();

    return (
        <div className="card">
            <h2>Counter</h2>
            <p>Count: <strong>{state.counter}</strong></p>
            <div className="button-group">
                <button onClick={() => state.counter++}>Increment</button>
                <button onClick={() => state.counter--}>Decrement</button>
            </div>
        </div>
    )
}

function App() {
  return (
    <div className="app-container">
      <h1>React Binding State Demo</h1>
      <UserProfile />
      <Counter />
    </div>
  );
}

export default App;
