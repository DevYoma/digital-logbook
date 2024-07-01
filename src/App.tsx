import { useState } from 'react';
import './App.scss'
import useLoggedInRedirect from './hooks/useLoggedInRedirect';
import { useUserTheme } from './context/ThemeContext';

function App() {
  useLoggedInRedirect(); // Redirect to dashboard if user is logged in

  // const [isDarkMode, setIsDarkMode] = useState(false);

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  //   document.documentElement.classList.toggle('dark')
  // }

  const { isDarkMode, setIsDarkMode, toggleTheme } = useUserTheme();
  // console.log(isDarkMode);
  return (
    <div className="app">
        <button 
          onClick={toggleTheme} 
          className="theme-toggle"
        >
          {isDarkMode ? "Normal Mode" : "Dark Mode"}
        </button>
       <h2>Digital IT Logbook Landing Page</h2>
       <p>Simple and Secure: Track Your Daily IT Progress</p>
       <p>Organize your IT learning journey with ease</p>
    </div>
  );
}

export default App