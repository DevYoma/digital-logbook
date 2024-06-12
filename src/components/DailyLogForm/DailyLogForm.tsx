import React, { useState } from "react";
import "./DailyLogForm.scss";

const DailyLogForm = () => {
  const [dailyLogText, setDailyLogText] = useState("");
//   const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  ); // Initial date in YYYY-MM-DD format

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDailyLogText(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleEditDate = () => {
    // Implement logic to open a date picker or allow manual date input
    // (This is optional if you want to allow date editing later)
    alert("Coming soon");
  };

  const handleDailyLogFormSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (dailyLogText.length === 0) {
      alert("Text field cannot be empty");
      return;
    }
  };

    // Calculate maximum date three months from now
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3); // Add 3 months to current date
  const maxDateStr = maxDate.toISOString().slice(0, 10);

  return (
    <div className="dailyLogForm">
      {/* <h3>Daily Log for {currentDate.toLocaleDateString()}</h3> */}
      <h3>Daily Log for {selectedDate}</h3>
      <form onSubmit={handleDailyLogFormSubmission}>
        <input 
            type="date" 
            value={selectedDate} 
            onChange={handleDateChange} 
            // Set maximum date (adjust as needed)
            // max={new Date().toISOString().slice(0, 10)}
            max={maxDateStr}
            style={{ marginBottom: "1rem" }}
        /> <br />

        <textarea
          value={dailyLogText}
          onChange={handleTextChange}
          rows={10}
          cols={50}
          placeholder="Enter your daily log entry here..."
        />
        {/* <p>Date: {currentDate.toLocaleDateString()}</p>{" "} */}
        <p>Date: {selectedDate}</p>{" "}
        <button onClick={handleEditDate} disabled={true}>
          Edit Date (Coming Soon)
        </button>{" "}
        {/* Optional: Disabled button for future date editing */}
        <button type="submit">Submit Daily Log</button>{" "}
        {/* Integrate with Supabase submission */}
      </form>
    </div>
  );
}

export default DailyLogForm