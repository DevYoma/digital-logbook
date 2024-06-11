import { useContext, useEffect, useState } from "react";
import Logo from "../../atoms/Logo/Logo"
import { UserAuthContext } from "../../context/UserAuthContext";
import { supabase } from "../../supabase/supabaseClient";
import { useNavigate } from 'react-router-dom';
import { User } from "@supabase/supabase-js";

type ProfileData = {
  name: string;
  email: string;
  schoolName: string;
  department: string;
  duration: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const {userData, setUserData, setIsAuth} = useContext(UserAuthContext);

  // Profile FormData
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "", 
    email: "", 
    schoolName: "", 
    department: "", 
    duration: "0"
  })

  
  const mapUserDataToState = (userData: User | null) => {
    return {
      email: userData?.user_metadata?.email || "", // Use get() with default value
      name: userData?.user_metadata?.studentName || "",
      schoolName: userData?.user_metadata?.schoolName || "",
      department: userData?.user_metadata?.department || "",
      duration: userData?.user_metadata?.duration || "", // Assuming IT duration in nested object
    };
  };

  useEffect(() => {
     if (userData) {
      const mappedData = mapUserDataToState(userData); // Map context data to state format
      setProfileData(mappedData);
    }
  }, [userData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // HANDLE LOGOUT (duplicate)
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if(error) {
      alert("Error logging out")
      return
    }

    setUserData(null);
    setIsAuth(false);
    navigate("/login") 
  }

  // HANDLE USER DATA UPDATE
  const handleUserDataUpdate = async () => {
 try {
   const userFromSB = supabase.auth.getUser(); // Get currently logged-in user

   if (!userFromSB) {
     throw new Error("No logged-in user found. Please sign in.");
   }

   const { data, error } = await supabase.auth.updateUser({
      data: {
        duration: profileData.duration,
        studentName: profileData.name,
        department: profileData.department, 
        schoolName: profileData.schoolName
      }
   });

   if (error) throw error;

   console.log("IT program duration updated successfully:", data);
   alert("IT program duration updated successfully!"); // User-friendly feedback
 } catch (error) {
   console.error("Error updating IT program duration:", error);
   alert(`Error: ${error?.message}`); // Informative error message
 } finally {
   // Optional actions after success or failure (e.g., reset loading state)
 }
  }

  // console.log(profileData);

  return (
    <div className="profile">
      <Logo />
      <div className="profileHeader">
        <h2>Profile Page</h2>

        <form className="profileForm">
          <div className="profileForm">
            <div className="profileFormDiv">
              <label htmlFor="email">Email Address:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                // required 
                value={profileData.email}
                // onChange={handleChange}
                readOnly
              />
            </div>

            <div className="profileFormDiv">
              <label htmlFor="name">Name:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                value={profileData.name}
                onChange={handleChange}
              />
            </div>

            <div className="profileFormDiv">
              <label htmlFor="school">School Name:</label>
              <input 
                type="text" 
                id="school" 
                name="schoolName" 
                required 
                value={profileData.schoolName}
                onChange={handleChange}
              />
            </div>

            <div className="profileFormDiv">
              <label htmlFor="department">Department:</label>
              <input 
                type="text" 
                id="department" 
                name="department" 
                value={profileData.department}
                onChange={handleChange}
              />
            </div>

            <div className="profileFormDiv">
              <label htmlFor="it-duration">IT Program Duration:</label>
              <select 
                id="it-duration" 
                name="duration"
                value={profileData.duration}
                onChange={handleChange}
              >
                <option value="">{""}</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
              </select>
            </div>

            <div className="profileFormDiv">
              <label htmlFor="custom-duration">Custom Duration (Optional):</label>
              <input type="number" id="custom-duration" name="custom-duration" min="1" />
            </div>
          </div>
        </form>

        <button onClick={handleUserDataUpdate}>Update</button>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Profile