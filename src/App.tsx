import { useContext } from 'react'
import './App.css'
import Logo from './atoms/Logo/Logo'
import { supabase } from './supabase/supabaseClient'
import { UserAuthContext } from './context/UserAuthContext'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  const { userData, setUserData  } = useContext(UserAuthContext)
  console.log(userData);
  // console.log(isAuth);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if(error) {
      alert("Error logging out")
      return
    }

    setUserData(null);
    navigate("/login") 
  }
  return (
    <div className="app">
      <Logo />
      <h2>Hello {userData?.user_metadata?.studentName}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default App
