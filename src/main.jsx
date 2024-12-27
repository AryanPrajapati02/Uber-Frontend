import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
// import { store } from './store/store.js'

// import { Provider } from 'react-redux'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import SocketProvider from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <CaptainContext>
  <UserContext>

  <SocketProvider>
     <BrowserRouter>
    
    <App />
    <Toaster />
    </BrowserRouter>
    </SocketProvider>
  </UserContext>
  </CaptainContext>
 
  </StrictMode>,
)
