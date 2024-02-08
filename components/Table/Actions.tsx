"use client";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Box,  Modal,IconButton} from "@mui/material";
import { useAppDispatch } from "@/reduxtoolkit/store/Hooks";
import { ToastContainer } from "react-toastify";

function Actions(props:any) {
  const dispatch = useAppDispatch();
  
  
  return (
    <Box>
      <IconButton onClick={()=>props.handleDataUpdate(props.params.data)}>
        <EditTwoToneIcon color="primary" />
      </IconButton>
      <IconButton onClick={()=>props.deleteCamera(props.params.data._id)}>
        <DeleteTwoToneIcon color="error" />
      </IconButton>
      <ToastContainer/>
    </Box>
  );
}

export default Actions;
