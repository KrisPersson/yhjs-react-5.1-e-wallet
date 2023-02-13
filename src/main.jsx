import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './views/App.jsx'
import AddCardView from './views/AddCardView.jsx'

import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'addcard',
    element: <AddCardView />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)
