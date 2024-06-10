import { useEffect } from 'react'
import './App.css'
import Logo from './atoms/Logo/Logo'
import { supabase } from './supabase/supabaseClient'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  const getUserSession = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)
  }
  useEffect(() => {
    getUserSession();
  }, []) 

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if(error) {
      alert("Error logging out")
      return
    }

    navigate("/login")
  }
  return (
    <div className="app">
      <Logo />

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default App
