import { Navigate, Outlet } from "react-router-dom"
import { UserAuthContext } from "../context/UserAuthContext"
import { useContext } from "react"

const ProtectedRoute = () => {
  const { isAuth, isLoading } = useContext(UserAuthContext);

  if (isLoading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  return !isAuth ? <Navigate to="/login" /> : <Outlet />
};
export default ProtectedRoute