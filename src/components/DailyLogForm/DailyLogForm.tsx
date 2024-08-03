  import React, { useContext, useState } from "react";
import "./DailyLogForm.scss";
import { supabase } from "../../supabase/supabaseClient";
import { useCheckExistingEntry } from "../../hooks/useCheckExistingEntry";
import { UserAuthContext } from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { ExistingEntry } from "../../types/appTypes";
import { formatSelectedDate } from "../../utils/helper";
import Button from "../Button/Button";

const DailyLogForm = () => {
  const [dailyLogText, setDailyLogText] = useState("");
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

    // checking for weekend condition 
    const isWeekend = new Date(selectedDate).getDay() === 0 || new Date(selectedDate).getDay() === 6;
    if (isWeekend) {
      console.error("Error: You cannot submit logs on weekends.");
      alert("Log entries cannot be submitted on weekends!");
      return;
    }

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
  

  let signInDate;

  if(userData?.user_metadata?.startDate === undefined && userData?.user_metadata?.duration === undefined){
    signInDate = new Date();
    signInDate.setMonth(signInDate.getMonth() + 1);
  }else{
    signInDate = new Date(userData?.user_metadata?.startDate)
    signInDate.setMonth(signInDate.getMonth() + Number(userData?.user_metadata?.duration))
  }

  const maxDateStr = signInDate?.toISOString()?.slice(0, 10);

  // console.log(maxDate);
  // console.log(userData?.user_metadata?.startDate);

  const disableUntilDurationIsSet =
    userData?.user_metadata?.duration === undefined;

  return (
    <div className="dailyLogForm">
      <p className="dailyLogFormHeader">New Log</p>
      <p className="dailyLogFormText">
        Manage and organize your activities efficiently
      </p>
      {disableUntilDurationIsSet && (
        <p style={{ color: "red", marginBottom: "1rem" }}>
          Please update your profile data to get access to the form
        </p>
      )}
      <form onSubmit={handleDailyLogFormSubmission}>
        <div>
          <label htmlFor="dateInput">Date</label>
          <input
            type="date"
            id="dateInput"
            value={selectedDate}
            onChange={handleDateChange}
            min={
              userData?.user_metadata?.startDate !== undefined
                ? userData?.user_metadata?.startDate
                : null
            }
            max={maxDateStr}
            style={{ marginBottom: "1rem", width: "100%" }}
            disabled={disableUntilDurationIsSet}
          />
        </div>

        <div>
          <label htmlFor="entry">Log Entry</label>
          <textarea
            value={dailyLogText}
            id="entry"
            onChange={handleTextChange}
            rows={10}
            cols={50}
            required
            placeholder="Enter your daily log entry here..."
            disabled={disableUntilDurationIsSet}
          />
        </div>
        {/* <p>Date: {currentDate.toLocaleDateString()}</p>{" "} */}
        <p className="dailyLogFormDate">Date: {formatSelectedDate(selectedDate)}</p>{" "}

        {/* <button type="submit" disabled={disableUntilDurationIsSet}>
          Submit Daily Log
        </button>{" "} */}

        <Button 
          variant="secondary"
          size="large"
          style={{
            marginTop: "2rem", 
            width: "100%"
          }}
          disabled={disableUntilDurationIsSet || dailyLogText === ""}
        >
          Submit Log
        </Button>
      </form>
    </div>
  );
};

export default DailyLogForm;
