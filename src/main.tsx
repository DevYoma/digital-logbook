import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Dashboard, Login, LogsPage, NewPassword, Payment, Profile, Register, ResetPassword, Summary } from './pages/index.ts';
import { UserContextProvider } from './context/UserAuthContext.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { EditLogProvider } from './context/EditLogContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { CharacterCountProvider } from './context/CharacterCountContext.tsx';

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
      {
        path: "/summary", 
        element: <Summary />
      }
    ],
  },
  {
    path: "/",
    element: (
      <ThemeProvider>
        <App />
      </ThemeProvider>
    ),
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
      <CharacterCountProvider>
        <RouterProvider router={router}/>
      </CharacterCountProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
