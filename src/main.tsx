import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login, NewPassword, Register, ResetPassword } from './pages/index.ts';
import { UserContextProvider } from './context/UserAuthContext.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <App />
      }
    ]
  },
  // {
  //   path: '/',
  //   element: <App />
  // },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/new-password',
    element: <NewPassword />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
  </React.StrictMode>,
)
