"use client";
import { Box, TextField,Button, Switch, FormGroup, FormControlLabel, FormLabel } from "@mui/material";
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import { handleClose,handleUpdate } from "@/reduxtoolkit/features/ModalSlice";
import { modalProps } from "@/typescript.definations";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 640,
  bgcolor: "background.paper",
  p: 4,
};


function ModalData({handleFormSubmit,handleClick,formData,setFormData}:any) {
  
  const { isUpdate } = useAppSelector((store) => store.root.modal);
  const dispatch = useAppDispatch();
 
  const {name,district,city,area,_id,url,taluka,isActive,streamId}=formData
  
const handleCloseOnClick=()=>{
 
  setFormData({
     // @ts-ignore
    district:"",city:"",area:"",_id:"",url:"",taluka:"",isActive:true,name:"",streamId:""
  })
  dispatch(handleClose())
  dispatch(handleUpdate(false))

}

  return (
    <Box sx={style} className="rounded shadow-md ">
      <form  onSubmit={handleFormSubmit}  className="md:space-y-3 space-y-1 uppercase">
        <TextField
          onChange={handleClick}
          value={name}
          color="info"
          name="name"
          id="outlined-basic"
          label="Camera Name"
          variant="outlined"
          fullWidth
          
        />
        <TextField
          onChange={handleClick}
          value={streamId}
          color="info"
          name="streamId"
          id="outlined-basic"
          label="Stream id"
          variant="outlined"
          fullWidth
          
        />
        <TextField
          value={district}
          onChange={handleClick}
          color="secondary"
          id="filled-basic"
          label="District"
          name="district"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={taluka}
          onChange={handleClick}
          color="primary"
          id="outlined-basic"
          label="Taluka"
          name="taluka"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={city}
          onChange={handleClick}
          name="city"
          color="secondary"
          id="outlined-basic"
          label="City"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={area}
          onChange={handleClick}
          name="area"
          color="warning"
          id="outlined-basic"
          label="Area"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={url}
          onChange={handleClick}
          name="url"
          color="success"
          id="outlined-basic"
          label="stream hls url"
          variant="outlined"
          placeholder="example- https://cdn.stream.com/dxmnkfvndf.m3u8"
          fullWidth
        />
       <FormLabel component="legend">switch to enable or disable camera</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={isActive} onChange={handleClick} name="isActive" />
          }
         label={
    <span>
      camera{" "}
      {isActive ? (
        <span className="text-green-700 font-semibold">enabled</span>
      ) : (
        <span className="text-red-600 font-semibold">disabled</span>
      )}
    </span>
  }
        />
           </FormGroup>                    
      
      <Box className="mt-8 pt-5 flex-col md:flex-row flex md:gap-1 gap-2  justify-center ">
          <Button startIcon={<AddTwoToneIcon/>} fullWidth   size="large" variant="contained"  onClick={handleFormSubmit}
            
            type="button"
          >
            {isUpdate ? "update" : "ADD New Camera"}
          </Button>
          
          <Button startIcon={<ClearRoundedIcon/>}  variant="contained" size="large" color="error" 
            onClick={handleCloseOnClick}
            
            type="button"
          >
            Close
          </Button>
        </Box>
        </form>
    </Box>
  );
}

export default ModalData;
