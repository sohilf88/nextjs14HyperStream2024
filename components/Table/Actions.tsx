"use client";
import { useState } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Box, Button, Modal, TextField ,IconButton} from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 640,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function Actions() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <EditTwoToneIcon color="primary" />
      </IconButton>
      <IconButton>
        <DeleteTwoToneIcon color="error" />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="space-y-3">
          <TextField
            color="secondary"
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            color="secondary"
            id="filled-basic"
            label="Distric"
            variant="outlined"
            fullWidth
          />
          <TextField
            color="secondary"
            id="outlined-basic"
            label="Taluka"
            variant="outlined"
            fullWidth
          />
          <TextField
            color="secondary"
            id="outlined-basic"
            label="City"
            variant="outlined"
            fullWidth
          />
          <TextField
            color="secondary"
            id="outlined-basic"
            label="Area"
            variant="outlined"
            fullWidth
          />
          <TextField
            color="secondary"
            id="outlined-basic"
            label="Camera URL (optional)"
            variant="outlined"
            fullWidth
          />
          <Box className="mt-8 pt-5 flex gap-3 justify-center">
            <Button size="large" variant="contained">
              UPDATE
            </Button>
            <Button onClick={handleClose} size="large" variant="contained">
              CANCEL
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Actions;
