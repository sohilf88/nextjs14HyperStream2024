"use client";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Box, IconButton} from "@mui/material";

import { ToastContainer } from "react-toastify";

function Actions(props:any) {
  
  
  
  return (
    <Box>
      <IconButton size="small" onClick={()=>props.handleDataUpdateOnEditButton(props.params.data)}>
        <EditTwoToneIcon color="primary" />
      </IconButton>
      
      <IconButton size="small" onClick={()=>props.deleteCamera(props.params.data._id)}>
        <DeleteTwoToneIcon color="error" />
      </IconButton>
      <ToastContainer/>
    </Box>
  );
}

export default Actions;
