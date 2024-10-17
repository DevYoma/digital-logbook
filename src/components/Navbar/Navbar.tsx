// Navbar for logged in users
import "./Navbar.scss"
import Logo from "../../atoms/Logo/Logo"
import { NavLink, useNavigate } from "react-router-dom"
import Button from "../Button/Button"
import { useContext } from "react"
import { UserAuthContext } from "../../context/UserAuthContext"
import { supabase } from "../../supabase/supabaseClient"

const Navbar = () => {
    const navigate = useNavigate();
    const { setUserData, setIsAuth } = useContext(UserAuthContext) // make this a reusable hook

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if(error) {
        alert("Error logging out")  
        return
        }

        setUserData(null);
        setIsAuth(false);
        navigate("/login") 
    }
  return (
    <nav id="nav">
      <div className="navLeft">
        <Logo />
      </div>

      <div className="navMiddle">
        <NavLink to="/dashboard">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/logs">Logs</NavLink>
        {/* <NavLink to="/summary">Summaries</NavLink> */}
      </div>

      <div className="navRight">
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Navbar