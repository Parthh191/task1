import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { LoadingProvider } from './context/LoadingContext.jsx'
import { ImageProvider } from './context/ImageContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LoadingProvider>
        <ImageProvider>
          <App />
        </ImageProvider>
      </LoadingProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
