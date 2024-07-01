import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Dashboard, Login, LogsPage, NewPassword, Payment, Profile, Register, ResetPassword } from './pages/index.ts';
import { UserContextProvider } from './context/UserAuthContext.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { EditLogProvider } from './context/EditLogContext.tsx';

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/logs",
        element: (
          <EditLogProvider>
            <LogsPage />
          </EditLogProvider>
        ),
      },
      {
        path: "/payment",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
  </React.StrictMode>,
)
