/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./ResetPassword.scss";
import { supabase } from "../../supabase/supabaseClient";
import useLoggedInRedirect from "../../hooks/useLoggedInRedirect";
import Button from "../../components/Button/Button";
import { CircularProgress } from "@mui/material";

const ResetPassword = () => {
  useLoggedInRedirect();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | any>("")

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          // redirectTo: "http://localhost:5173/new-password",
          redirectTo: "https://digital-logbook-elv7.vercel.app/new-password",
        }
      );

      if (authError) {
        setError(error?.message);
        console.log(error)
        alert(authError.message)
      } else {
        // Success message (optional)
        console.log("Password reset email sent successfully!");
        alert("Check your email to get the change password link")
      }
    } catch (err) {
      console.error("Error sending password reset email:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="resetPasswordContainer">
      <div className="resetPassword">
        <h2 className="resetPasswordHeader">Reset Password</h2>
        <p>A reset password OTP link will be sent to your email address</p>

        <form className="resetPasswordForm" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button variant="form" disabled={isSubmitting || email === ""}>
            {isSubmitting ? (
              <CircularProgress color="inherit" size={"1.5rem"} data-testid="loadingSpinner"/>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
