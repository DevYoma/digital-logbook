/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import "./LogsPage.scss";
import { supabase } from "../../supabase/supabaseClient";
import { ExistingEntry } from "../../types/appTypes";
import { formatDate, generateMonthOptions } from "../../utils/helper";
import { Box, Modal, TextField } from "@mui/material";
import { EditLogContext } from "../../context/EditLogContext";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import { useDailyLogs } from "../../hooks/useDailyLogs";
import CharacterCount from "../../components/CharacterCount/CharacterCount";
import MonthSelect from "../../components/MonthSelect/MonthSelect";

const LogsPage = () => {
    const { dailyLogs, setDailyLogs, loading, fetchDailyLogs, filterLogsByMonth, userDataStartDate, userDataDuration } = useDailyLogs();
    const [selectedMonth, setSelectedMonth] = useState<number|null>(null);

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

  const monthOptions = [{ monthIndex: -1, monthName: "All Months" }, ...generateMonthOptions(new Date(userDataStartDate), parseInt(userDataDuration))];
  // console.log(monthOptions);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(event.target.value, 10);
    setSelectedMonth(month);
  };

  const filteredLogs = selectedMonth !== null && selectedMonth !== -1 ? filterLogsByMonth(selectedMonth) : dailyLogs;
  

  return (
    <div className="logsPage">
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        sx={{
          marginTop: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: 500, bgcolor: "background.paper", p: 4 }}>
          <h2>Edit Daily Log</h2>
          <form onSubmit={handleSubmitModal}>
            <div>
              <TextField
                sx={{ margin: "1rem 0 1rem" }}
                fullWidth
                label="Daily Log Entry"
                multiline
                minRows={4}
                maxRows={10}
                value={modalText}
                onChange={(e) => setModalText(e.target.value)}
              />
              <CharacterCount value={modalText} />
            </div>
            <Button variant="save">Update Log</Button>
          </form>
        </Box>
      </Modal>
      <div className="logsPageMain">
        <Navbar />

        {/* <select
          onChange={handleMonthChange}
          value={selectedMonth !== null ? selectedMonth : ""}
        >
          {monthOptions.map((option) => (
            <option key={option.monthIndex} value={option.monthIndex}>
              {option.monthName}
            </option>
          ))}
        </select> */}

        <MonthSelect 
          handleMonthChange={handleMonthChange}
          monthOptions={monthOptions}
          selectedMonth={selectedMonth}
        />

        <div className="logsPageMainContent">
          {loading ? (
            <div className="loadingIndicator">
              {/* <CircularProgress /> */}Loading...
            </div>
          ) : dailyLogs.length === 0 ? (
            <p>You haven't submitted any daily logs yet.</p>
          ) : filteredLogs.length === 0 ? (
            <p>You don't have any logs for the selected month</p>
          ) : (
            filteredLogs.map((dailyLog: ExistingEntry) => (
              <div key={dailyLog.id} className="logsPageMainContentItem">
                <p>Date: {formatDate(new Date(dailyLog.date))}</p>
                <p>Log</p>
                <pre>{dailyLog.text}</pre>
                <Button
                  variant="form"
                  size="small"
                  onClick={() => handleEditLogEntry(dailyLog.id)}
                  style={{ marginRight: "1rem" }}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LogsPage