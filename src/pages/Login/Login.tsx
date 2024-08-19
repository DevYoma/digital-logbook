import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from "../../context/UserAuthContext";
import Button from "../../components/Button/Button";
import { CircularProgress } from "@mui/material"

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
        email: formData.email.trim(),
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
      // alert("Oops! Something went wrong. Please try again");
      // @ts-expect-error("alert error message from Supabase")
      alert(error?.message)
      // console.log(error?.message)
      console.log(error)
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // console.log(userData);

  return (
    <div id="loginContainer">
      <div className="login">
        <h1 className="loginHeader">Login</h1>
        <p className="loginText">Log in to your account</p>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              minLength={6}
              value={formData.password}
              required
              onChange={handleChange}
            />
          </div>

          <Button
            variant="form"
            disabled={
              formData.email === "" || formData.password === "" || loading
            }
            style={{
              marginTop: "2.8rem",
            }}
          >
            {loading ? <CircularProgress color="inherit" size={"1.5rem"}/> : "Login"}
          </Button>
        </form>
        <p className="loginForgotPassword">
          <Link
            to={"/reset-password"}
            style={{
              color: "#4318FF",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Forgot Password?
          </Link>
        </p>

        <p className="loginNewUser">
          New user?
          <Link
            to={"/register"}
            style={{ color: "#4318FF", textDecoration: "none" }}
          >
            {" "}
            Create account{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login