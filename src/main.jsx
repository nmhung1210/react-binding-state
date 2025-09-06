import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BindingStateProvider } from './BindingState.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BindingStateProvider initialState={{
      count: 0
    }}>
      <App />
    </BindingStateProvider>
  </StrictMode>,
)
