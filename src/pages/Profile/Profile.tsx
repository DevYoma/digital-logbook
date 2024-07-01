import { useContext, useEffect, useState } from "react";
import Logo from "../../atoms/Logo/Logo"
import { UserAuthContext } from "../../context/UserAuthContext";
import { supabase } from "../../supabase/supabaseClient";
import { Link, useNavigate } from 'react-router-dom';
import { User } from "@supabase/supabase-js";
import { ProfileData } from "../../types/appTypes";

const Profile = () => {
  const navigate = useNavigate();
  const { userData, setUserData, setIsAuth } = useContext(UserAuthContext);

  // Profile FormData
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    schoolName: "",
    department: "",
    duration: "0",
    startDate: "",
  });

  // Track form changes
  const [isFormDirty, setIsFormDirty] = useState(false);

  const mapUserDataToState = (userData: User | null) => {
    return {
      email: userData?.user_metadata?.email || "", // Use get() with default value
      name: userData?.user_metadata?.studentName || "",
      schoolName: userData?.user_metadata?.schoolName || "",
      department: userData?.user_metadata?.department || "",
      duration: userData?.user_metadata?.duration || "",
      startDate: userData?.user_metadata?.startDate || "",
    };
  };

  useEffect(() => {
    if (userData) {
      const mappedData = mapUserDataToState(userData); // Map context data to state format
      setProfileData(mappedData);
    }
  }, [userData]);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setProfileData({
      ...profileData,
      [name]: value,
    });

    setIsFormDirty(true); // Set form dirty on any change
  };

  // HANDLE LOGOUT (duplicate)
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error logging out");
      return;
    }

    setUserData(null);
    setIsAuth(false);
    navigate("/login");
  };

  // HANDLE USER DATA UPDATE
  const handleUserDataUpdate = async () => {
    if (!profileData.name) {
      alert("Please enter a valid response for the Name field");
      return;
    }

    if (!profileData.email) {
      alert("Please enter a valid response for the Email field");
      return;
    }

    if (!profileData.schoolName) {
      alert("Please enter a valid response for the School field");
      return;
    }

    if (!profileData.department) {
      alert("Please enter a valid response for the Department field");
      return;
    }

    // Check for both empty string and default duration
    if (!profileData.duration || profileData.duration === "0") {
      alert("Duration is required");
      return;
    }

    if (!profileData.startDate) {
      alert("Start date is required");
      return;
    }

    console.log(profileData);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          duration: profileData.duration,
          startDate: profileData.startDate,
          studentName: profileData.name,
          department: profileData.department,
          schoolName: profileData.schoolName,
        },
      });

      if (error) throw error;

      console.log("IT program duration updated successfully:", data);
      alert("IT data updated successfully!"); // User-friendly feedback
      setUserData(data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating IT program duration:", error);
      alert(`Error: ${error?.message}`); // Informative error message
    } finally {
      // Optional actions after success or failure (e.g., reset loading state)
    }
  };

  // console.log(userData);

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
                required
                value={profileData.department}
                onChange={handleChange}
              />
            </div>

            <div className="profileFormDiv">
              <label htmlFor="it-duration">IT Program Duration:</label>
              <select
                id="it-duration"
                name="duration"
                required
                value={profileData.duration}
                onChange={handleChange}
              >
                <option value="">{""}</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
              </select>
            </div>

            <div className="profileFormDiv">
              <label htmlFor="startdate">Start Date</label>
              <input
                type="date"
                name="startDate"
                id="startdate"
                required
                value={profileData.startDate}
                onChange={handleChange}
              />
            </div>

            {/* <div className="profileFormDiv">
              <label htmlFor="custom-duration">Custom Duration (Optional):</label>
              <input type="number" id="custom-duration" name="custom-duration" min="1" />
            </div> */}
          </div>
        </form>
        <Link to={"/"}>Go to Home Page</Link> <br />
        <button onClick={handleUserDataUpdate} disabled={!isFormDirty}>Update</button>
        <button onClick={handleLogout}>Logout</button> <br />
        <button onClick={() => navigate("/payment")}>Pay via Paystack</button>
      </div>
    </div>
  );
}

export default Profile