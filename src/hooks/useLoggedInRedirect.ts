import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Optional for capturing previous path
import { UserAuthContext } from "../context/UserAuthContext";

const useLoggedInRedirect = () => {
  const { isAuth, userData } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from ? location.state.from : "/"; // Optional to capture the previous path

  useEffect(() => {
    if (isAuth && userData !== null) {
      navigate(from); // Redirect to the previous page or a default path (/)
    }
  }, [navigate, userData]);

};

export default useLoggedInRedirect;
