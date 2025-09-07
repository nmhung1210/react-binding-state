# `react-binding-state`

![NPM Version](https://img.shields.io/npm/v/react-binding-state?style=flat-square)
![NPM Downloads](https://img.shields.io/npm/dm/react-binding-state?style=flat-square)
![License](https://img.shields.io/npm/l/react-binding-state?style=flat-square)

A lightweight, easy-to-use state management library for React that enables deep two-way data binding. It uses ES6 Proxies to automatically detect and update state changes, even in nested objects, without the need for manual setters or reducers.

## Live Demo

Check out the live demo here: **[https://nmhung1210.github.io/react-binding-state](https://nmhung1210.github.io/react-binding-state)**

## Key Features

*   **Deep Two-Way Data Binding:** Automatically syncs your UI with your state, even for deeply nested objects.
*   **Zero Boilerplate:** No actions, reducers, or dispatchers needed. Just mutate the state directly.
*   **Lightweight:** A small footprint, adding minimal overhead to your project.
*   **Intuitive API:** A simple and straightforward API that is easy to learn and use.

## Installation

```bash
npm install react-binding-state
```

## Usage

### 1. Wrap Your App with `BindingStateProvider`

Provide the global state to your application by wrapping your root component with `BindingStateProvider`.

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BindingStateProvider } from 'react-binding-state';
import './App.css'; // Import global styles

const initialState = {
  user: {
    name: 'John Doe',
    profile: {
      email: 'john.doe@example.com',
    },
  },
  counter: 0,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BindingStateProvider initialState={initialState}>
      <App />
    </BindingStateProvider>
  </React.StrictMode>
);
```

### 2. Use the `useBindingState` Hook

Access and mutate the state from any component using the `useBindingState` hook. Changes are automatically reflected in your UI.

```jsx
// src/App.jsx
import React from 'react';
import { useBindingState } from 'react-binding-state';

function UserProfile() {
  const state = useBindingState();

  return (
    <div class="card">
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
        <div class="card">
            <h2>Counter</h2>
            <p>Count: <strong>{state.counter}</strong></p>
            <div class="button-group">
                <button onClick={() => state.counter++}>Increment</button>
                <button onClick={() => state.counter--}>Decrement</button>
            </div>
        </div>
    )
}

function App() {
  return (
    <div class="app-container">
      <h1>React Binding State Demo</h1>
      <UserProfile />
      <Counter />
    </div>
  );
}

export default App;
```

## How It Works

`react-binding-state` leverages a React Context to provide a global state object wrapped in an ES6 Proxy. When you modify a property on the state proxy (e.g., `state.user.name = 'Jane Doe'`), the proxy’s `set` trap is triggered. This trap efficiently updates the underlying state and triggers a re-render of only the components that use the modified state, ensuring your UI is always in sync with your data with minimal performance overhead.

## Test Coverage

```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |      100 |     100 |     100 |                   
 BindingState.jsx |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
