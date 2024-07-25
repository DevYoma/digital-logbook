import { ChangeEvent, useContext, useEffect, useState } from "react";
import Logo from "../../atoms/Logo/Logo";
import "./Login.scss";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from "../../context/UserAuthContext";
// import useLoggedInRedirect from "../../hooks/useLoggedInRedirect";

const Login = () => {
  // useLoggedInRedirect();
  const { setUserData, setIsAuth, isAuth, userData } = useContext(UserAuthContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(isAuth && userData !== null){
      navigate("/dashboard") 
    }
  }, [navigate, userData, isAuth])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.table(formData);
      const {data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })
      if(error) throw error
      // console.log(data)
        setUserData(data.user);
        setIsAuth(true)
        navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      setIsAuth(false)
      alert("Oops! Something went wrong. Please try again");
      // console.log(error?.message)
      console.log(error)
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // console.log(userData);

  return (
    <div className="login">
      <Logo />
      <h1 className="loginHeader">Login</h1>
      <p className="loginText">
        Don’t have an account?{" "}
        <Link
          to={"/register"}
          style={{ color: "#4318FF", textDecoration: "none" }}
        >
          create one here
        </Link>
      </p>
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          required
          onChange={handleChange}
        />
        <button>{loading ? "Loading..." : "Login"}</button>
      </form>
        <p className="loginForgotPassword">
          Forgot your password?
          <Link to={"/reset-password"} style={{ color: "#4318FF", textDecoration: "none" }}> Reset it here </Link>
        </p>
    </div>
  );
}

export default Login