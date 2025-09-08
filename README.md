
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
*   **TypeScript Support:** Written in TypeScript for a better developer experience with type safety and autocompletion.

## Installation

```bash
npm install react-binding-state
```

## Usage

### 1. Define Your State Type (Optional but Recommended)

For the best experience, define a type for your global state.

```typescript
// src/types.ts
export type AppState = {
  user: {
    name: string;
    profile: {
      email: string;
    };
  };
  counter: number;
};
```

### 2. Wrap Your App with `BindingStateProvider`

Provide the global state to your application by wrapping your root component with `BindingStateProvider`.

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BindingStateProvider } from 'react-binding-state';
import './App.css'; // Import global styles
import { AppState } from './types';

const initialState: AppState = {
  user: {
    name: 'John Doe',
    profile: {
      email: 'john.doe@example.com',
    },
  },
  counter: 0,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BindingStateProvider initialState={initialState}>
      <App />
    </BindingStateProvider>
  </React.StrictMode>
);
```

### 3. Use the `useBindingState` Hook

Access and mutate the state from any component using the `useBindingState` hook. Changes are automatically reflected in your UI.

```tsx
// src/App.tsx
import React from 'react';
import { useBindingState } from 'react-binding-state';
import { AppState } from './types';

function UserProfile() {
  const state = useBindingState<AppState>();

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
    const state = useBindingState<AppState>();

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
```

## How It Works

`react-binding-state` leverages a React Context to provide a global state object wrapped in an ES6 Proxy. When you modify a property on the state proxy (e.g., `state.user.name = 'Jane Doe'`), the proxy’s `set` trap is triggered. This trap efficiently updates the underlying state and triggers a re-render of only the components that use the modified state, ensuring your UI is always in sync with your data with minimal performance overhead.

## TypeScript Support

This library is written in TypeScript to provide a first-class development experience.

*   **Type-Safe State:** By providing a type to the `useBindingState` hook (e.g., `useBindingState<AppState>()`), you get full type safety and autocompletion for your state object.
*   **Reduced Bugs:** Catch typos and other errors at compile time, not at runtime.
*   **Improved Readability:** Type definitions make your code easier to understand and maintain.

## Performance Benchmarks

Here's a summary of the benchmark results comparing `BindingState` with the native `useState` hook:

### Benchmark Environment

*   **CPU:** AMD EPYC 7B12 (2 Cores)
*   **Memory:** 8 GB

### Results

| Benchmark                          | `BindingState` (ops/sec) | `useState` (ops/sec) | Winner         | Performance Gain |
| ---------------------------------- | ---------------------- | -------------------- | -------------- | ---------------- |
| Initial Render with Heavy State    | 458.59                 | 588.06               | `useState`     | 1.28x            |
| Heavy Simple State Update          | 11,875.21              | 2,007.02             | `BindingState` | 5.92x            |
| Heavy Deeply Nested State Update   | 19,872.92              | 3,096.64             | `BindingState` | 6.42x            |
| Heavy Array Item Update            | 21,289.86              | 3,869.84             | `BindingState` | 5.50x            |

### Conclusion

The benchmark results highlight a clear trade-off:

*   **`useState` excels at initial rendering**, offering a **1.28x** performance advantage due to its native and highly optimized nature.
*   **`BindingState` is significantly faster for all types of state updates**, with performance gains ranging from **5.50x to 6.42x**. The most substantial improvements are seen in scenarios with deeply nested objects, where `BindingState`'s direct mutation approach avoids the performance overhead of manual immutable updates.

In summary, for applications with complex state and frequent updates, `BindingState` provides a compelling combination of performance and developer experience. If initial render time is the highest priority, `useState` may be a better choice. However, for applications where the user experience is defined by frequent state changes, `BindingState` offers a significant performance advantage.

## Test Coverage

```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |      100 |     100 |     100 |                   
 BindingState.tsx |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
