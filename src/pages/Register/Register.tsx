import { useContext, useEffect, useState } from "react";
import "./Register.scss";
import Logo from "../../atoms/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { UserAuthContext } from "../../context/UserAuthContext";
import useLoggedInRedirect from "../../hooks/useLoggedInRedirect";

const Register = () => {
  useLoggedInRedirect();
  const { userData, isAuth } = useContext(UserAuthContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    studentName: "", 
    schoolName: "",
    department: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

    useEffect(() => {
    if(isAuth && userData !== null){
      navigate("/") 
    }
  }, [navigate, userData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Do your validations here
    if(formData.password !== formData.confirmPassword){
      alert("Passwords do not match");
      setLoading(false)
      return;
    }

    try {
      console.table(formData);
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options:{
          emailRedirectTo: "http://localhost:5173/login",
          data: {
            studentName: formData.studentName,
            schoolName: formData.schoolName,
            department: formData.department 
            // add the empty fields here
          }
        }
      })

      if (error) throw error;
      console.log(data);
      alert("Check your email for the verification link") // route them to Login Page
    } catch (error) {
      alert(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <Logo />
      <h1 className="registerHeader">Register</h1>
      <p>
        Already have an account?{" "}
        <Link
          to={"/login"}
          style={{ color: "#4318FF", textDecoration: "none" }}
        >
          Login
        </Link>
      </p>
      <form className="registerForm" onSubmit={handleSubmit}>
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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="schoolName"
          placeholder="School Name"
          value={formData.schoolName}
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          required
          onChange={handleChange}
        />
        <button>{loading ? "Loading..." : "Create Account"}</button>
      </form>
    </div>
  );
}

export default Register