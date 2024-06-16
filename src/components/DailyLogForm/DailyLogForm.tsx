import React, { useContext, useState } from "react";
import "./DailyLogForm.scss";
import { supabase } from "../../supabase/supabaseClient";
import { useCheckExistingEntry } from "../../hooks/useCheckExistingEntry";
import { UserAuthContext } from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { ExistingEntry } from "../../types/appTypes";

const DailyLogForm = () => {
  const [dailyLogText, setDailyLogText] = useState("");
  //   const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  ); // Initial date in YYYY-MM-DD format
  const { userData } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const { existingEntry, isLoading, error } = useCheckExistingEntry(
    userData,
    selectedDate
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDailyLogText(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleDailyLogFormSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (dailyLogText.length === 0) {
      alert("Text field cannot be empty");
      return;
    }

    const data = {
      text: dailyLogText,
      date: selectedDate,
    };

    if (isLoading) {
      console.log("Checking for existing entry...");
      return; // Prevent submission while data is being fetched
    }

    if (error) {
      // Data being entered does not match any in the DB
      console.log("No data matched");
    }

    // Check for duplicate using .find
    const duplicateEntry = existingEntry?.find((entry: ExistingEntry) => {
      // Compare properties to identify duplicates (e.g., text and date)
      return entry.user_id === userData?.id && entry.date === selectedDate;
    });

    if (duplicateEntry) {
      console.error("Error: You can only submit one log per day.");
      alert("You can only submit one log entry per day!");
      return; // Prevent submission if duplicate exists
    }

    try {
      const { error } = await supabase.from("dailyLogs").insert(data);
      if (error) throw error;

      console.log("Daily log entry submitted successfully!");
      alert("Daily log entry submitted successfully!");
      navigate("/logs");
      setDailyLogText("");
      // Optionally clear the form or display a success message
    } catch (error) {
      console.error("Error submitting daily log:", error);
      alert("Error submitting daily log entry");
      // Optionally display an error message to the user
    }
  };

  // Calculate maximum date three months from now
  // const minDate = userData?.user_metadata?.startDate
  
  const maxDate = new Date(userData?.user_metadata?.startDate);
  // const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + Number(userData?.user_metadata?.duration)); // Add 3 months to current date
  const maxDateStr = maxDate.toISOString().slice(0, 10);
  // console.log(maxDate);

  // console.log(userData?.user_metadata?.startDate);

  const disableUntilDurationIsSet =
    userData?.user_metadata?.duration === undefined;

  return (
    <div className="dailyLogForm">
      {/* <h3>Daily Log for {currentDate.toLocaleDateString()}</h3> */}
      <h3>Daily Log for {selectedDate}</h3>
      {disableUntilDurationIsSet && (
        <p style={{ color: "red" }}>
          Please update your profile data to get access to the form
        </p>
      )}
      <form onSubmit={handleDailyLogFormSubmission}>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={userData?.user_metadata?.startDate}
          max={maxDateStr}
          style={{ marginBottom: "1rem" }}
          disabled={disableUntilDurationIsSet}
        />{" "}
        <br />
        <textarea
          value={dailyLogText}
          onChange={handleTextChange}
          rows={10}
          cols={50}
          required
          placeholder="Enter your daily log entry here..."
          disabled={disableUntilDurationIsSet}
        />
        {/* <p>Date: {currentDate.toLocaleDateString()}</p>{" "} */}
        <p>Date: {selectedDate}</p>{" "}
        <button type="submit" disabled={disableUntilDurationIsSet}>
          Submit Daily Log
        </button>{" "}
      </form>
    </div>
  );
};

export default DailyLogForm;
