import React, { useState } from 'react'
import "./NewPassword.scss";
import { supabase } from '../../supabase/supabaseClient';
import Logo from '../../atoms/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import useLoggedInRedirect from '../../hooks/useLoggedInRedirect';

const NewPassword = () => {
    useLoggedInRedirect();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setCofirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      if(confirmNewPassword !== newPassword){
        alert("Passwords do not match");
        setLoading(false)
        return;
      }

      try {
        const {data, error} = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        console.log(data);
        alert("Password updated successfully");
        navigate("/login")
      } catch (error: any) {
        console.log(error);
        alert(error?.message)
        setLoading(false);
      }finally{
        setLoading(false);
      }
    };
    
  return (
    <div className="newPassword">
        <Logo />
        <h2 className="newPasswordHeader">New Password Page</h2>
        <p>Enter your new password</p>
    
        <form className="newPasswordForm" onSubmit={handlePasswordChange}>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
    
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              required
              value={confirmNewPassword}
              onChange={(e) => setCofirmNewPassword(e.target.value)}
            />
    
            <button>{loading ? "Loading..." : "Submit"}</button>
        </form>
    </div>
  )
}

export default NewPassword