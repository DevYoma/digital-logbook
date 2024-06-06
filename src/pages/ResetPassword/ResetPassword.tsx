import { useState } from "react"
import Logo from "../../atoms/Logo/Logo"
import "./ResetPassword.scss"

const ResetPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = () => {

    }

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

            <button
            >
                Submit
            </button>
        </form>
    </div>
  )
}

export default ResetPassword