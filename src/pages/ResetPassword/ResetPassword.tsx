/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Logo from "../../atoms/Logo/Logo";
import "./ResetPassword.scss";
import { supabase } from "../../supabase/supabaseClient";
import useLoggedInRedirect from "../../hooks/useLoggedInRedirect";

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
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/new-password",
      });

      if (authError) {
        setError(error?.message);
        console.log(error)
        alert(authError.message)
      } else {
        // Success message (optional)
        console.log("Password reset email sent successfully!");
      }
    } catch (err) {
      console.error("Error sending password reset email:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="resetPassword">
      <Logo />
      <h2 className="resetPasswordHeader">Reset Password</h2>
      <p>A reset password OTP will be sent to your email address</p>

      <form className="resetPasswordForm" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button> {isSubmitting ? "Loading..." : "Submit"}</button>
      </form>
    </div>
  );
};

export default ResetPassword;
