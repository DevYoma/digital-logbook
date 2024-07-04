import { Link, useNavigate } from 'react-router-dom';
import './App.scss'
import Logo from './atoms/Logo/Logo';
import useLoggedInRedirect from './hooks/useLoggedInRedirect';
// import { MdDarkMode } from "react-icons/md";
import Button from './components/Button/Button';

function App() {
  const navigate = useNavigate();
  useLoggedInRedirect(); // Redirect to dashboard if user is logged in

  // const { isDarkMode, setIsDarkMode, toggleTheme } = useUserTheme();

  const handleOnRegister = () => {
    navigate("/register");
  }
  return (
    <div className="app">
      <nav className="appNavbar">
        <div className="appNavbar__logo">
          <Logo />
        </div>

        <ul className="appNavbar__links">
          <li>Home</li>
          <li>About</li>
          {/* <li>Testimonials</li> */}
          <li>Pricing</li>
        </ul>

        <div className="appNavbar__ctaButtons">
          <Link
            to={"/login"}
            style={{
              listStyle: "nonbe",
              textDecoration: "none",
              color: "#EAE9EC",
            }}
          >
            Login
          </Link>

          <Button onClick={handleOnRegister} variant="outline">
            Register
          </Button>
        </div>
      </nav>

      <div className="appHero">
        <h1>Simple and Secure: Track Your Daily IT Progress</h1>
        <p>Never Lose Track: Record Your IT Tasks, Projects & Achievements</p>
      </div>

      <div className="appAbout">
        <h3>Organise yourself better with Digital Logbook</h3>
        <p>
          Digital Logbook is a user-friendly platform designed to help you
          document and track your progress in the IT field.
        </p>
        <p>
          Record your daily learning experiences, projects, and achievements in
          a central location.
        </p>
        <p>
          Gain valuable insights into your growth and stay motivated on your IT
          journey.
        </p>
      </div>
    </div>
  );
}

export default App