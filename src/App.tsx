import { useNavigate } from "react-router-dom";
import "./App.scss";
import Logo from "./atoms/Logo/Logo";
import useLoggedInRedirect from "./hooks/useLoggedInRedirect";
import Button from "./components/Button/Button";

function App() {
  const navigate = useNavigate();
  useLoggedInRedirect();

  const handleOnRegister = () => {
    navigate("/register");
  };

  const handleOnLogin = () => {
    navigate("/login");
  };

  return (
    <div className="app">
      <nav className="appNavbar">
        <div className="appNavbar__logo">
          <Logo />
        </div>

        <div className="appNavbar__ctaButtons">
          <Button onClick={handleOnRegister} variant="outline">
            Register
          </Button>

          <Button onClick={handleOnLogin} variant="outline">
            Login
          </Button>
        </div>
      </nav>

      <section className="appHero">
        <h1>Digital Logbook</h1>
        <div>Track your internship journey effectively. Log daily entries to easily access and review your experiences, eliminating the issue of scattered or forgotten activities.</div>

        <div className="appHeroContentButton">
          <Button size="large" variant="primary" onClick={handleOnRegister}>Get Started</Button>
        </div>
      </section>
    </div>
  );
}

export default App;
