import { useContext } from 'react'
import './Dashboard.scss'
import Logo from "../../atoms/Logo/Logo"
import { supabase } from '../../supabase/supabaseClient'
import { UserAuthContext } from '../../context/UserAuthContext'
import { useNavigate, Link } from 'react-router-dom'
import DailyLogForm from '../../components/DailyLogForm/DailyLogForm'

const Dashboard = () =>  {
  const navigate = useNavigate();
  const { userData, setUserData, setIsAuth } = useContext(UserAuthContext)
  // console.log(userData);

  // HANDLE LOGOUT (duplicate)
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
    <div className="dashboard" style={{ background: "white" }}>
      <Logo />
      <div className="dashboardHeader">
        <Link to="/profile">Profile</Link> <br />
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>Hello {userData?.user_metadata?.studentName}</h2>
      <p>College: {userData?.user_metadata?.schoolName}</p>
      <p>Department: {userData?.user_metadata?.department}</p>
      <p>Email: {userData?.user_metadata?.email}</p>

      <div>
        <DailyLogForm />
      </div>

      <Link to="/logs">Logs Page</Link>
    </div>
  );
}

export default Dashboard