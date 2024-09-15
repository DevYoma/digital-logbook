import { useContext, useEffect, useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { UserAuthContext } from "../../context/UserAuthContext";
import useLoggedInRedirect from "../../hooks/useLoggedInRedirect";
import Button from "../../components/Button/Button";
import { CircularProgress } from "@mui/material"

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
      navigate("/dashboard") 
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

  // Check if form is valid based on your custom criteria
  const isFormValid = () => {
      return (
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.studentName &&
          formData.schoolName &&
          formData.department &&
          formData.password === formData.confirmPassword
      );
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

    const emailSuffix = formData.email.split('.')[1];
    const lengthOfEmailSuffix = emailSuffix?.length
    // console.log(emailSuffix)
    
    if(!formData.email.includes(".") || lengthOfEmailSuffix < 2){
      alert("Email field not valid")
      setLoading(false);
      return
    }
    
    // console.table(formData)
    try {
      // console.table(formData);
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options:{
          // emailRedirectTo: "http://localhost:5173/login",
          emailRedirectTo: "https://digital-logbook-elv7.vercel.app/login",
          data: {
            studentName: formData.studentName,
            schoolName: formData.schoolName,
            department: formData.department 
            // add the empty fields here
          }
        }
      })

      if (error){
        throw error
      }

      // check for user uniqueness
      if (data?.user?.identities?.length === 0) {
        alert("Email already registered. Please try a different email.");
        setLoading(false);
        return;
      }

      console.log("User data:",data);
      alert("Sign up successful! Check your email for the verification link") // route them to Login Page
    } catch (error) {
      console.log("Error signing up:", error)
      // @ts-expect-error("allow")
      alert(error?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="registerContainer">
      <div className="register">
        <h1 className="registerHeader" data-testid="register-id">
          Create Account
        </h1>
        <p className="registerText">
          Get started with Log book entering your information below
        </p>

        <form className="registerForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password (6+ characters)"
              minLength={6}
              data-testid="password"
              value={formData.password}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              minLength={6}
              data-testid="confirm-password"
              value={formData.confirmPassword}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="studentName"
              id="name"
              placeholder="Student Name"
              value={formData.studentName}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="schoolName">School Name</label>
            <input
              type="text"
              name="schoolName"
              id="schoolName"
              placeholder="School Name"
              value={formData.schoolName}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="department">Department</label>
            <input
              type="text"
              name="department"
              id="department"
              placeholder="Department"
              value={formData.department}
              required
              onChange={handleChange}
            />
          </div>

          <Button
            variant="form"
            style={{
              margin: "2rem 0",
            }}
            disabled={!isFormValid()}
          >
            {loading ? (
              <CircularProgress color="inherit" size={"1.5rem"} data-testid="registerLoadingSpinner"/>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <p className="registerQuestion">
          Already have an account?{" "}
          <Link
            to={"/login"}
            style={{ color: "#4318FF", textDecoration: "none" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register