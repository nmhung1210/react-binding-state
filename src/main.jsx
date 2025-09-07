import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BindingStateProvider } from './BindingState.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BindingStateProvider initialState={{
      user: {
        name: 'John Doe',
        profile: {
          email: 'john.doe@example.com',
        },
      },
      counter: 0,
    }}>
      <App />
    </BindingStateProvider>
  </StrictMode>,
)
