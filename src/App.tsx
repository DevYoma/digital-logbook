import { useContext } from 'react'
import './App.scss'
import Logo from './atoms/Logo/Logo'
import { supabase } from './supabase/supabaseClient'
import { UserAuthContext } from './context/UserAuthContext'
import { useNavigate, Link } from 'react-router-dom'
import DailyLogForm from './components/DailyLogForm/DailyLogForm'

function App() {
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
    <div className="app">
      <Logo />
      <div className="appHeader">
        <Link to="/profile">Profile</Link> <br />
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>Hello {userData?.user_metadata?.studentName}</h2>
      <p>College: {userData?.user_metadata?.schoolName}</p>
      <p>Department: {userData?.user_metadata?.department}</p>

      <div>
        <DailyLogForm />
      </div>
    </div>
  );
}

export default App