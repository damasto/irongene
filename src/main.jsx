import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth.context.jsx'
import { VerifyInputProviderWrapper } from './context/inputVerification.context.jsx'
import { FormDataProviderWrapper } from './context/formData.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProviderWrapper>
        <VerifyInputProviderWrapper>
          <FormDataProviderWrapper>
            <App />
          </FormDataProviderWrapper>
        </VerifyInputProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </StrictMode>,
)
