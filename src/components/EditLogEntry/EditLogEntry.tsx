import { Box, Modal } from "@mui/material"
import { useState } from "react";
import { ExistingEntry } from "../../type/appTypes";

type Prop = {
    initialEntry: ExistingEntry
    onSubmit: () => void
}

const EditLogEntry = ({ initialEntry, onSubmit }: Prop) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState(initialEntry)

    const handleDailyLogUpdate = async () => {
        alert("update online")
    }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ width: 400 }}>
        <form onSubmit={handleDailyLogUpdate}>
          
        <input
          type="date"
          value={formData.date}
        //   onChange={handleDateChange}
        //   max={maxDateStr}
          style={{ marginBottom: "1rem" }}
        />{" "}
        <br />
        <textarea
          value={formData.text}
        //   onChange={handleTextChange}
          rows={10}
          cols={50}
          required
          placeholder="Enter your daily log entry here..."
        />

          <button type="submit">Save Changes</button>
        </form>
      </Box>
    </Modal>
  );
}

export default EditLogEntry;