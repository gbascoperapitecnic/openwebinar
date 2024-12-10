import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MoviesProviderWrapper } from './context/movies.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <MoviesProviderWrapper>
      <App />
    </MoviesProviderWrapper>
    </BrowserRouter>
  </StrictMode>,
)
