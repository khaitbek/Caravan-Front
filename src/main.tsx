import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import { AuthProvider } from "./context/AuthProvider"
import { OrderProvider } from "./context/OrderProvider"
import { TruckProvider } from "./context/TruckContext"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>

      <AuthProvider>
        <UserProvider>
          <TruckProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </TruckProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
