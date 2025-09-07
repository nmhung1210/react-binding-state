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

## Performance Benchmarks

Here's a summary of the benchmark results comparing `BindingState` with the native `useState` hook:

### Benchmark Environment

*   **CPU:** AMD EPYC 7B12 (2 Cores)
*   **Memory:** 8 GB

### Results

| Benchmark                          | `BindingState` (ops/sec) | `useState` (ops/sec) | Winner         | Performance Gain |
| ---------------------------------- | ---------------------- | -------------------- | -------------- | ---------------- |
| Initial Render with Heavy State    | 479.20                 | 676.37               | `useState`     | 1.41x            |
| Heavy Simple State Update          | 11,358.60              | 2,535.02             | `BindingState` | 4.48x            |
| Heavy Deeply Nested State Update   | 20,459.04              | 3,637.18             | `BindingState` | 5.62x            |
| Heavy Array Item Update            | 20,033.68              | 4,391.10             | `BindingState` | 4.56x            |

### Conclusion

The benchmark results highlight a clear trade-off:

*   **`useState` excels at initial rendering**, offering a **1.41x** performance advantage due to its native and highly optimized nature.
*   **`BindingState` is significantly faster for all types of state updates**, with performance gains ranging from **4.48x to 5.62x**. The most substantial improvements are seen in scenarios with deeply nested objects, where `BindingState`'s direct mutation approach avoids the performance overhead of manual immutable updates.

In summary, for applications with complex state and frequent updates, `BindingState` provides a compelling combination of performance and developer experience. If initial render time is the highest priority, `useState` may be a better choice. However, for applications where the user experience is defined by frequent state changes, `BindingState` offers a significant performance advantage.

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
