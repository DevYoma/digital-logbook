import { Box, Modal } from "@mui/material"
import { useState } from "react";
import { ExistingEntry } from "../../type/appTypes";

type Prop = {
  initialEntry: ExistingEntry
  onSubmit: (updatedData: ExistingEntry) => void;
  isOpen: boolean;
  onClose: () => void;
}

const EditLogEntry = ({ initialEntry, onSubmit, isOpen, onClose }: Prop) => {
    const [open, setOpen] = useState(isOpen);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState(initialEntry)

    // const handleDailyLogUpdate = async (e:React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     alert("update online")
    //     setOpen(false)
    //     // window.location.reload()
    // }

    const handleTextChange = () => {
      
    }

    const handleCloseModal = () => {
      onClose()
      // setOpen(false);
    }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ width: 400 }}>
        <form onSubmit={(e: any) => onSubmit(formData)}>
        <textarea
          value={formData.text}
          onChange={handleTextChange}
          rows={10}
          cols={50}
          required
          placeholder="Enter your daily log entry here..."
        />

          <button type="submit">Save Changes</button>

          <button onClick={handleCloseModal}>Close Form</button>
        </form>
      </Box>
    </Modal>
  );
}

export default EditLogEntry;