/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import "./LogsPage.scss";
import { supabase } from "../../supabase/supabaseClient";
import { UserAuthContext } from "../../context/UserAuthContext";
import { ExistingEntry } from "../../types/appTypes";
import { formatDate } from "../../utils/helper";
import { Box, Modal, TextField } from "@mui/material";
import { EditLogContext } from "../../context/EditLogContext";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";

const LogsPage = () => {
    const [dailyLogs, setDailyLogs] = useState<ExistingEntry[]>([]);
    const { userData } = useContext(UserAuthContext);
    // console.log(userData);

    // MODAL STATE
    const { logData, setLogData,  openEditModal, handleCloseEditModal, setOpenEditModal } = useContext(EditLogContext);

    const [modalText, setModalText] = useState(logData?.text || "");

    const handleSubmitModal = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const { error } = await supabase
          .from('dailyLogs')
          .update({ text: modalText }) // Update the text field only
          .eq('id', logData?.id) // update the specific log entry

          if (error) throw error;

          console.log("Log entry updated successfully!");

          // Update local state for immediate UI update
          setDailyLogs((prevEntries) =>
            prevEntries.map((entry) =>
              entry.id === logData?.id ? { ...entry, text: modalText } : entry
            )
          );

          setOpenEditModal(false) // close modal
      } catch (error) {
          console.error("Error updating log entry:", error);
          alert("Error updating log entry!"); // Inform the user
      }

      handleCloseEditModal();
    }
    
    /// END OF MODAL STATE

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
    const isConfirmed = window.confirm("Are you sure you want to delete this log entry?")

    if(!isConfirmed) return
    
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

  // EDIT LOG ENTRY
  const handleEditLogEntry = async (logEntryId: string) => {
    try {
      const { data: logEntry, error } = await supabase.from('dailyLogs').select('*').eq('id', logEntryId).single();

      if (error) throw error;

      // console.log("Log entry to edit:", logEntry);
      setOpenEditModal(true);
      setModalText(logEntry?.text || "");
      setLogData(logEntry);
    } catch (error) {
      console.log("Error updating log entry:", error);
    }
  }

  // console.log(logData)

  return (
    <div className="logsPage">
      <Modal 
        open={openEditModal}
        onClose={handleCloseEditModal} 
        sx={{ 
          marginTop: "1.5rem",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
        <Box sx={{ width: 500, bgcolor: "background.paper", p: 4 }}>
          {/* <h2>{logData ? "Edit Daily Log" : "Create Daily Log"}</h2> */}
          <h2>Edit Daily Log</h2>
          <form onSubmit={handleSubmitModal}>
            <TextField
              sx={{ margin: "1rem 0 1rem"}}
              fullWidth
              label="Daily Log Entry"
              multiline
              rows={4}
              // value={logData?.text}
              value={modalText}
              onChange={(e) => setModalText(e.target.value)}
            />
            <Button 
              variant="save"
            >
              Update Log
            </Button>
          </form>
        </Box>
      </Modal>
      <div className="logsPageMain">
        <Navbar />

        <div className="logsPageMainContent">
          {dailyLogs.map((dailyLog: ExistingEntry) => (
            <div
              key={dailyLog.id}
              className="logsPageMainContentItem"
            >
              <p>Date: {formatDate(new Date(dailyLog.date))}</p>
              <p>Log</p>
              <pre>{dailyLog.text}</pre>
                <Button 
                variant="form"
                size="small"
                onClick={() => handleEditLogEntry(dailyLog.id)}
                style={{
                  marginRight: "1rem"
                }}
              >
                Edit
              </Button>

              <Button
                variant="danger"
                size="small"
                onClick={() => handleDeleteLogEntry(dailyLog.id)}
              >
                Delete
              </Button>
            </div>
          ))}
          {dailyLogs.length === 0 && (
            <p>You haven't submitted any daily logs yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default LogsPage