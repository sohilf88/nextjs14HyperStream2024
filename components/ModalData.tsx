"use client";
import { Box, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import { handleClose } from "@/reduxtoolkit/features/ModalSlice";
import { useState,useCallback } from "react";
import { onRowSelectedSlice } from "@/reduxtoolkit/features/cameraSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 640,
  bgcolor: "background.paper",
  p: 4,
};

function ModalData() {
  const { onRowSelected } = useAppSelector((store) => store.cameras);
  const { isUpdate } = useAppSelector((store) => store.modal);
  const dispatch = useAppDispatch();

  
//   const [formState, setFormState] = useState({
//     name: "",
//     district: "",
//     taluka: "",
//     city: "",
//     area: "",
//     url: "",
//   });
  
//   function onChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setFormState({
//       ...formState,
//       [event.target.name]: event.target.value,
//     });
//   }

  return (
    <Box sx={style} className="rounded shadow-md ">
      <form className="md:space-y-3 space-y-1">
        <TextField
          
          value={onRowSelected?.name}
        //   defaultValue={formState.name}
          color="primary"
          name="name"
          id="outlined-basic"
          label="Camera Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={onRowSelected?.district}
          
          color="primary"
          id="filled-basic"
          label="District"
          name="district"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={onRowSelected?.taluka}
          
          color="primary"
          id="outlined-basic"
          label="Taluka"
          name="taluka"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={onRowSelected?.city}
          
          name="city"
          color="primary"
          id="outlined-basic"
          label="City"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={onRowSelected?.area}
          
          name="area"
          color="primary"
          id="outlined-basic"
          label="Area"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={onRowSelected?.url}
          
          name="url"
          color="primary"
          id="outlined-basic"
          label="CCTV Link (ex- rtmp://server.com/STREAM_KEY)"
          variant="outlined"
          fullWidth
        />
        <Box className="mt-8 pt-5 flex-col md:flex-row flex md:gap-1 gap-2 justify-center ">
          <button
            className=" flex-1 px-6 uppercase  text-white hover:bg-blue-600 py-2 bg-blue-500 rounded-xs shadow-lg active:shadow-md"
            type="submit"
          >
            {isUpdate ? "ADD NEW" : "update"}
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
