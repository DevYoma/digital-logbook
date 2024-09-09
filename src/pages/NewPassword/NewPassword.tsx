import React, { useState } from 'react'
import "./NewPassword.scss";
import { supabase } from '../../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const NewPassword = () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        alert(error?.message)
        setLoading(false);
      }finally{ 
        setLoading(false);
      }
    };
    
  return (
    <div id="newPasswordContainer">
      <div className="newPassword">
        <h2 className="newPasswordHeader">New Password Page</h2>
        <p>Enter your new password</p>

        <form className="newPasswordForm" onSubmit={handlePasswordChange}>
          <input
            type="password"
            name="password"
            placeholder="New Password (6+ characters)"
            minLength={6}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password (6+ characters)"
            minLength={6}
            required
            value={confirmNewPassword}
            onChange={(e) => setCofirmNewPassword(e.target.value)}
          />

          <button>{loading ? <CircularProgress color="inherit" size={"1.5rem"} /> : "Submit"}</button>
        </form>
      </div>
    </div>
  );
}

export default NewPassword