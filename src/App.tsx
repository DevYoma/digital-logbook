import { useContext } from 'react'
import './App.scss'
import Logo from './atoms/Logo/Logo'
import { supabase } from './supabase/supabaseClient'
import { UserAuthContext } from './context/UserAuthContext'
import { useNavigate, Link } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  const { userData, setUserData, setIsAuth } = useContext(UserAuthContext)
  // console.log(userData);

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
        <h2>Hello {userData?.user_metadata?.studentName}</h2>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default App
