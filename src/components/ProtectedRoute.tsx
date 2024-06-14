import { Navigate, Outlet } from "react-router-dom"
import { UserAuthContext } from "../context/UserAuthContext"
import { useContext } from "react"
import useLoggedInRedirect from "../hooks/useLoggedInRedirect";

const ProtectedRoute = () => {
  const { isAuth, isLoading } = useContext(UserAuthContext);
  useLoggedInRedirect()

  if (isLoading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  return !isAuth ? <Navigate to="/login" replace/> : <Outlet />
};
export default ProtectedRoute