"use client";
import { Box, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import { handleClose } from "@/reduxtoolkit/features/ModalSlice";
import { useState, useEffect } from "react";
import useTableHook from "@/hooks/useTableHook";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 640,
  bgcolor: "background.paper",
  p: 4,
};

function ModalData({onSubmit,handleClick,formData,updateSingleCamera}) {
  const { onRowSelected } = useAppSelector((store) => store.cameras);
  const { isUpdate } = useAppSelector((store) => store.modal);
  const dispatch = useAppDispatch();
 
  const {name,district,city,area,_id,url,taluka}=formData
  


  return (
    <Box sx={style} className="rounded shadow-md ">
      <form onSubmit={onSubmit} className="md:space-y-3 space-y-1">
        <TextField
          onChange={handleClick}
          value={name}
          color="primary"
          name="name"
          id="outlined-basic"
          label="Camera Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={district}
          onChange={handleClick}
          color="primary"
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
          color="primary"
          id="outlined-basic"
          label="City"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={area}
          onChange={handleClick}
          name="area"
          color="primary"
          id="outlined-basic"
          label="Area"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={url}
          onChange={handleClick}
          name="url"
          color="primary"
          id="outlined-basic"
          label="CCTV Link (ex- rtmp://server.com/STREAM_KEY)"
          variant="outlined"
          fullWidth
        />
        <Box className="mt-8 pt-5 flex-col md:flex-row flex md:gap-1 gap-2 justify-center ">
          <button onClick={updateSingleCamera(formData)}
            className=" flex-1 px-6 uppercase  text-white hover:bg-blue-600 py-2 bg-blue-500 rounded-xs shadow-lg active:shadow-md"
            type="submit"
          >
            {isUpdate ? "update" : "ADD New Camera"}
          </button>
          
          <button 
            onClick={() => dispatch(handleClose())}
            className="px-6 uppercase rounded-xs text-white hover:bg-red-600 py-2 bg-red-500  shadow-lg"
            type="button"
          >
            Cancel
          </button>
        </Box>
      </form>
    </Box>
  );
}

export default ModalData;
