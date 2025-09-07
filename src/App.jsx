import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
  const codeString = `
import React from 'react';
import { BindingStateProvider, useBindingState } from 'react-binding-state';

function UserProfile() {
  const state = useBindingState();

  return (
    <div>
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
        <div>
            <h2>Counter</h2>
            <p>Count: <strong>{state.counter}</strong></p>
            <button onClick={() => state.counter++}>Increment</button>
            <button onClick={() => state.counter--}>Decrement</button>
        </div>
    )
}

function App() {
  const initialState = {
    counter: 0,
    user: {
      name: 'John Doe',
      profile: {
        email: 'john.doe@example.com',
      },
    },
  };

  return (
    <BindingStateProvider value={initialState}>
      <h1>React Binding State Demo</h1>
      <UserProfile />
      <Counter />
    </BindingStateProvider>
  );
}

export default App;
  `;

  return (
    <div className="app-container">
      <div className="demo-container">
        <h1>React Binding State Demo</h1>
        <UserProfile />
        <Counter />
      </div>
      <div className="code-container">
        <SyntaxHighlighter language="jsx" style={dracula}>
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default App;
