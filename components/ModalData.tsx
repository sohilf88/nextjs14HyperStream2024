"use client";
import { Box, Button, TextField } from "@mui/material";
import { useAppDispatch } from "@/reduxtoolkit/store/Hooks";
import { handleClose } from "@/reduxtoolkit/features/ModalSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 640,
  bgcolor: "background.paper",
  //   border: "1px solid #000",
  //   boxShadow: 24,
  p: 4,
};

function ModalData() {
  const dispatch = useAppDispatch();
  return (
    <Box sx={style} className="rounded shadow-md ">
      <form className="md:space-y-3 space-y-1" action="">
        <TextField
          color="primary"
          id="outlined-basic"
          label="Camera Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          color="primary"
          id="filled-basic"
          label="District"
          variant="outlined"
          fullWidth
        />
        <TextField
          color="primary"
          id="outlined-basic"
          label="Taluka"
          variant="outlined"
          fullWidth
        />
        <TextField
          color="primary"
          id="outlined-basic"
          label="City"
          variant="outlined"
          fullWidth
        />
        <TextField
          color="primary"
          id="outlined-basic"
          label="Area"
          variant="outlined"
          fullWidth
        />
        <TextField
          color="primary"
          id="outlined-basic"
          label="CCTV Link (ex- rtmp://server.com/STREAM_KEY)"
          variant="outlined"
          fullWidth
        />
        <Box className="mt-8 pt-5 flex-col md:flex-row flex md:gap-1 gap-2 justify-center ">
          {/* <Button size="large" variant="contained" type="submit">
            UPDATE
          </Button>
          <Button onClick={handleClose} size="large" variant="contained">
            CANCEL
          </Button> */}
          <button
            className=" flex-1 px-6 uppercase  text-white hover:bg-blue-600 py-2 bg-blue-500 rounded-xs shadow-lg active:shadow-md"
            type="submit"
          >
            update
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
