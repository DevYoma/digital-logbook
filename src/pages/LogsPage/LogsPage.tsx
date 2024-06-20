/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import "./LogsPage.scss";
import { supabase } from "../../supabase/supabaseClient";
import { UserAuthContext } from "../../context/UserAuthContext";
import { ExistingEntry } from "../../types/appTypes";
import { formatDate } from "../../utils/helper";

const LogsPage = () => {
    const [dailyLogs, setDailyLogs] = useState<ExistingEntry[]>([]);
    const { userData } = useContext(UserAuthContext);
    // console.log(userData);

    // Fetch DailyLogs from Supabase
    const fetchDailyLogs = async () => {
      try {
          const { data, error } = await supabase
              .from('dailyLogs')
              .select('*')
              .eq('user_id', userData?.id)
              .order('date', { ascending: false }); // Order by date (latest first)
      
          if (error) throw error;
      
          setDailyLogs(data);
      } catch (error) {
          console.log(error);
          setDailyLogs([])
      }
  };
    useEffect(() => {
    fetchDailyLogs();
  }, []);

  // console.log(dailyLogs);

  // DELETE LOG ENTRY
  const handleDeleteLogEntry = async (logEntryId: string) => {
    try {
      const { error } = await supabase
        .from('dailyLogs')
        .delete()
        .eq('id', logEntryId); // Replace 'id' with your actual primary key

      if (error) throw error;

      console.log("Log entry deleted successfully!");
       // Local filtering for UI update
      setDailyLogs(prevEntries => prevEntries.filter(entry => entry.id !== logEntryId));

      // Refetch DailyLogs
      fetchDailyLogs();

      // Optional: Re-fetch data to update the UI after deletion (discussed later)
    } catch (error) {
      console.error("Error deleting log entry:", error);
      alert("Error deleting log entry!"); // Inform the user
    }
  };



  return (
    <div className="dailyLogList">
      <h2>Your Daily Logs</h2>
      {dailyLogs.map((dailyLog: ExistingEntry) => (
        <div
          key={dailyLog.id}
          className="dailyLogItem"
          style={{ border: "1px dashed black", marginBottom: "1rem" }}
        >
          <p>Date: {formatDate(new Date(dailyLog.date))}</p>
          {/* <p>Log: {dailyLog.text}</p> */}
          <p>Log</p>
          <pre>{dailyLog.text}</pre>
          <p>UserId: {dailyLog.user_id}</p>
          {/* <button
            // onClick={() => handleUpdateLogEntry(dailyLog)}
            onClick={() => handleEditModal(dailyLog)}
            style={{ marginRight: "1rem" }}
          >
            Edit
          </button> */}

          <button onClick={() => handleDeleteLogEntry(dailyLog.id)}>
            Delete
          </button>
        </div>
      ))}
      {dailyLogs.length === 0 && (
        <p>You haven't submitted any daily logs yet.</p>
      )}
    </div>
  );
}

export default LogsPage