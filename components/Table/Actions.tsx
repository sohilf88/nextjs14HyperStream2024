"use client";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Box,  Modal,IconButton} from "@mui/material";
import { useAppDispatch } from "@/reduxtoolkit/store/Hooks";
import {handleOpen} from "@/reduxtoolkit/features/ModalSlice"

function Actions() {
  const dispatch = useAppDispatch();
  
  
  return (
    <Box>
      <IconButton onClick={() => dispatch(handleOpen())}>
        <EditTwoToneIcon color="primary" />
      </IconButton>
      <IconButton>
        <DeleteTwoToneIcon color="error" />
      </IconButton>
    </Box>
  );
}

export default Actions;
