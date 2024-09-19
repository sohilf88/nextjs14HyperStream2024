"use client";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Box, IconButton, Tooltip} from "@mui/material";
import { axiosAuth } from "@/app/lib/axios";
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';

function Actions(props:any) {
  
  // working function only disabled for time being
//  async function disableCamera(id:string){
//   try {
//     const response =await axiosAuth.patch(`/camera/disable/${id}`,{isActive:false})
//     if(response.data.message){
//       props.getUser()
//       // console.log("success")
//     }
//   } catch (error) {
    
//   }
//  }
  
  return (
    <div className="flex gap-2 ">
      <Tooltip title="Edit Detail">
      <IconButton size="small" onClick={()=>props.handleDataUpdateOnEditButton(props.params.data)}>
        <EditTwoToneIcon color="warning" />
      </IconButton>
      </Tooltip>
      {/* pending to work it later */}
       {/* <Tooltip title="Disable Camera">
     <IconButton size="small" onClick={()=>disableCamera(props.params.data._id)}>
        <NoPhotographyIcon color="primary" />
      </IconButton>
      </Tooltip> */}
      <Tooltip title="Delete Permanent">
      <IconButton size="small" onClick={()=>props.deleteCamera(props.params.data._id)}>
        <DeleteTwoToneIcon color="error" />
      </IconButton>
     </Tooltip>
    </div>
  );
}

export default Actions;
