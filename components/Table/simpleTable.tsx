// "use client"


// import { AgGridReact } from "ag-grid-react"; // React Grid Logic
// // import "ag-grid-community/styles/ag-grid.css"; // Core CSS
// // import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
// import { ColDef, AgGridEvent, ValueGetterParams, RowSelectedEvent } from "ag-grid-community"; //typeScript for ag grid
// import { useState, useEffect } from "react";

// import { Box, Button, Modal ,ButtonGroup, Stack, Fab, TextField, InputLabel, Badge, Tooltip} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
// import SlowMotionVideoTwoToneIcon from '@mui/icons-material/SlowMotionVideoTwoTone';
// import PlayCircleTwoToneIcon from '@mui/icons-material/PlayCircleTwoTone';
// import Actions from "./Actions";

// import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
// import ModalData from "@/components/ModalData";
// import { handleClose,handleOpen, handlePlayAllCameras,handleSelectedCameras } from "@/reduxtoolkit/features/ModalSlice";
// import useTableHook, { errorHandler } from "@/hooks/useTableHook";
// import { onRowSelectedSlice, selectedCamera } from "@/reduxtoolkit/features/cameraSlice";
// import { camera } from "@/typescript.definations";
// import DriveFolderUploadTwoToneIcon from '@mui/icons-material/DriveFolderUploadTwoTone';
// import { axiosAuth } from "@/app/lib/axios";
// import axios from "axios"
// import { toast } from "sonner";
// import { useFormStatus } from "react-dom";

// import DeleteTwoTone from "@mui/icons-material/DeleteTwoTone";
// import Link from "next/link";
// import {io} from "socket.io-client"
// function SimpleTable() {
//   const {role,userId}=useAppSelector((store)=>store.root.userRole)
 
//   const {
//   rowData,
//   formData,
//   getAllCameraDataFromBackEnd,
//   handleFormSubmit,
//   handleClick,
//   handleDataUpdateOnEditButton,
//   deleteSingleCamera,
//   disableSelectedCamera,
//   setFormData
// } = useTableHook();
 
//   const [gridReady, setGridReady] = useState<AgGridEvent>();
//   const [rowSelected,setRowSelected]=useState<camera[]| null>([])
//   const [isSelected,setIsSelected]=useState(false)
//   const [isDeleted,setIsDeleted]=useState(false)
//   const dispatch = useAppDispatch();
 
  
//   // console.log(role,userId)
// // multiple Camera delete Function
// async function deleteMultipleCameras(){
//   let deleteMultiples=[] as string[]
//   rowSelected && rowSelected.map((row:camera)=>{
//     deleteMultiples?.push(row._id as string)
   
//   })
//   try {
    
//     setIsDeleted(true)

//   const response=await axiosAuth.delete("/camera/deletemany",{data:{deleteMultiples}})
//   // console.log(response.status)
//   if(response){
//     // @ts-ignore
    
//     getAllCameraDataFromBackEnd()
//     setIsDeleted(false)
//     toast.error(` Removed successfully,Total deleted count =${response.data.message} `)
//   }
    
//   } catch (error) {
//     // console.log(error)
//     setIsDeleted(false)
//     errorHandler(error)
//   }
 
// }
//   // for table height size
//   const [width, setWidth] = useState(0)
//   // const [heightofViewport, setheightofViewport] = useState(0)

//   const handleWindowResize = () => {
//     setWidth(window.innerWidth);
//     // setheightofViewport(window.innerHeight);
//   }
//   if(width>1600){
//     var height=640
//   }else{
//     height=480
//   }
//   // useEffect(() => {
//   //   // component is mounted and window is available
//   //   handleWindowResize();
//   //   window.addEventListener('resize', handleWindowResize);
//   //   // unsubscribe from the event on component unmount
//   //   return () => window.removeEventListener('resize', handleWindowResize);
//   // }, []);
  
//  }
//   useEffect(() => {
//     // @ts-ignore
//      getAllCameraDataFromBackEnd();
    
//     //  setIsPlayAll(gridReady?.api.paginationGetRowCount()===0)
//      handleWindowResize();
//     window.addEventListener('resize', handleWindowResize);

//     // unsubscribe from the event on component unmount
//     return () => window.removeEventListener('resize', handleWindowResize);
//   }, []);

//   const [defaultCols, setDefaultCols] = useState<ColDef>({
//     filter: true,
//     floatingFilter: true,
//     flex: 1,
//   });

//   // socket configuration

 

//   const [cameraColDefs, setCameraColDefs] = useState<ColDef[]>([
//     {
//       field: "name",
//       headerName: "Name",
      
//       checkboxSelection: true,
//       headerCheckboxSelection: true,
//       headerCheckboxSelectionFilteredOnly: true,
//     },
//     { field: "district", headerName: "District", },
//     { field: "taluka", headerName: "Taluka"},
//     { field: "city", headerName: "City", },
//     { field: "area",headerName:"Location" },
//     { field: "isLive",headerName:"Camera Status" },
//     { field: "streamStart",headerName:"streamStart",filter: false, },
//     { field: "streamEnd",headerName:"streamEnd",filter: false, },
//     {
//       field: "Action",
//       filter: false,
//       editable: false,
//       maxWidth: 240,
      
//       cellRenderer: (parmas:ValueGetterParams) => {
        
//         return <Actions getUser={getAllCameraDataFromBackEnd} deleteCamera={deleteSingleCamera} handleDataUpdateOnEditButton={handleDataUpdateOnEditButton}  params={parmas} />;
//       },
//     },
//   ]);
  
//   // below state is for MUI-Modal only
//   const { isOpen } = useAppSelector((store) => store.root.modal);
// //  const { selectedCamera } = useAppSelector((store) => store.root.cameras)
 
//   function onGridReady(params: AgGridEvent) {
   
//    setGridReady(params)
  
//   }


//   // get no.of selected rows and add into ReduxToolkit
//   function getSelectedRowsByCheckBox(event: AgGridEvent) {
//     setRowSelected(event.api.getSelectedRows())
//     dispatch(selectedCamera(event.api.getSelectedRows()));
//   }
//   // select single row for and display into modal via ReduxToolkit Camera Slice with Reducer onRowSelected
//   function onRowSelectedFunction(event: RowSelectedEvent) {
//     if (event.node.isSelected()) {
//       dispatch(onRowSelectedSlice(event.data));
     
//     }
//   }

//   function playAllCamerasinNewTabOnClick(){
//   dispatch(handlePlayAllCameras(true))
//   window.open('/user', '_blank', 'noopener')

// }
// function playselectedCamerasinNewTabOnClick(){
//   dispatch(handlePlayAllCameras(false))
//   window.open('/user/selected', '_blank', 'noopener')

// }
// // function disabledCamera(){
// //   dispatch(handlePlayAllCameras(false))
// //   window.open('/dashboard/disabled', '_blank', 'noopener')

// // }

// // check length of selected cameras is 0 or not

 
//   useEffect(()=>{
// if(rowSelected!=null && rowSelected.length >0){
//   setIsSelected(true)
//  }
//  if(rowSelected?.length===0 ){
//   setIsSelected(false)
//  }
//   },[rowSelected])
 
 
   
//     // 
//     useEffect(() => {
//      if (!userId) return;
     
//     const socket = io("http://localhost:5000", {
//       withCredentials: true, // important if you use cookies for auth
//     });

//     socket.on("connect", () => {
//       console.log("✅ Connected:", socket.id);

//       // join room for logged-in user
//       socket.emit("joinRoom", userId);
//     });

//     socket.on("cameraUpdate", (data) => {
//       console.log("📩 Received camera update:", data);
//       // handle data (update state, toast, etc.)
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ Disconnected from server");
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId]);

//     // return () => socket.disconnect();



//   return (
//     <>
//     <div className="for-buttons md:mb-1 xl:mb-3 3xl:mb-5 ">
    
     
//      <main className="flex gap-5 items-center ">
//         <section></section>
    
    
              

         
//   <form className="flex max-w-xs" action={onSubmit}>
    // <Fileupload></Fileupload>
     
     
//   </form>
//  <Button color="secondary" size="large" onClick={()=>dispatch(handleOpen())}  variant="contained" startIcon={<AddTwoToneIcon />}>Add Camera</Button>
  
        
          
         
     
//       <div className=" flex flex-1 gap-5  justify-end">
//     <Button
//       disabled={!isSelected}
//          onClick={
//         playselectedCamerasinNewTabOnClick
//     } size="large" variant="contained"  startIcon={<SlowMotionVideoTwoToneIcon/>}>Play Selected</Button>
//         {/* @ts-ignore */}
//       <Button disabled={rowData?.length===0}  onClick={playAllCamerasinNewTabOnClick} size="large" variant="contained"  color="success" startIcon={<PlayCircleTwoToneIcon/>}>Play All</Button>
//     </div>       
    
//         <div className="  justify-end flex gap-5" >
          
//            <Button onClick={deleteMultipleCameras} type="button"  disabled={!isSelected} size="large" variant="contained"  color="error" startIcon={<DeleteIcon />}>{isDeleted?"deleting...":"Delete many"}</Button>
        
//             {/* <Tooltip title="Recycle bin">
//                     <Badge badgeContent={1} color="success">
 

//       <Fab onClick={disabledCamera} color="error" size="small" aria-label="RecyclingTwoTone">
//   <DeleteTwoTone />
// </Fab>
// </Badge>
//           </Tooltip> */}
      
     
     
//         </div>
      
      
 
      
     
      
      
//       </main>
      
//     </div>
    
//     <div className="ag-theme-quartz-dark shadow-lg" style={{ height: height,maxWidth:"90%",margin:"auto",textAlign:"center",textShadow:"revert-layer",color:"green" }}>
      
//       <AgGridReact
//         defaultColDef={defaultCols}
//         columnDefs={cameraColDefs}
//         //@ts-ignore
//         rowData={rowData} 
//         rowSelection={"multiple"}
//         suppressRowDeselection={true}
//         rowMultiSelectWithClick={true}
//         pagination={true}
//         onGridReady={onGridReady}
//         onRowSelected={onRowSelectedFunction}
//         onSelectionChanged={getSelectedRowsByCheckBox}
        
        
        
//         // enableCellChangeFlash={true}
//       />
//       <Modal open={isOpen} onClose={() => dispatch(handleClose())}>
//         <Box>
//         <ModalData handleFormSubmit={handleFormSubmit} handleClick={handleClick} formData={formData} setFormData={setFormData}/>
        
//         </Box>
//       </Modal>
     
//     </div>
//     </>
//   );
// }

// export default SimpleTable;


// chatgpt improved code as below

"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, AgGridEvent, RowSelectedEvent } from "ag-grid-community";

import {
  Box,
  Button,
  Modal,
  IconButton,
  Tooltip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SlowMotionVideoTwoToneIcon from "@mui/icons-material/SlowMotionVideoTwoTone";
import PlayCircleTwoToneIcon from "@mui/icons-material/PlayCircleTwoTone";
import DriveFolderUploadTwoToneIcon from "@mui/icons-material/DriveFolderUploadTwoTone";
import LoopTwoToneIcon from '@mui/icons-material/LoopTwoTone';
import Actions from "./Actions";
import ModalData from "@/components/ModalData";

import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import { handleClose, handleOpen, handlePlayAllCameras } from "@/reduxtoolkit/features/ModalSlice";
import { onRowSelectedSlice, selectedCamera } from "@/reduxtoolkit/features/cameraSlice";

import useTableHook, { errorHandler } from "@/hooks/useTableHook";
import { camera } from "@/typescript.definations";

import { axiosAuth } from "@/app/lib/axios";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

type Nullable<T> = T | null;

export default function SimpleTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const { role, userId } = useAppSelector((s) => s.root.userRole);
  const { isOpen } = useAppSelector((s) => s.root.modal);
 console.log(userId,role

 )
 
  // hook (returns object)
  const {
    rowData,
    formData,
    getAllCameraDataFromBackEnd,
    handleFormSubmit,
    handleClick,
    handleDataUpdateOnEditButton,
    deleteSingleCamera,
    disableSelectedCamera,
    setFormData,
    setRowData,
  } = useTableHook();

  // local UI state
  const [gridApiReady, setGridApiReady] = useState<Nullable<AgGridEvent>>(null);
  const [rowSelected, setRowSelected] = useState<camera[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);

  // socket ref so we don't re-create connection
  const socketRef = useRef<Nullable<Socket>>(null);

  // file input ref for upload form
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // derive height from width
  const height = width > 1600 ? 640 : 480;

  // resize handler (debounced-ish)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // initial data load (once)
  useEffect(() => {
    getAllCameraDataFromBackEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Selected rows -> redux + local
  const onSelectionChanged = useCallback((event: AgGridEvent) => {
    const selected = event.api.getSelectedRows() as camera[];
    setRowSelected(selected);
    dispatch(selectedCamera(selected));
  }, [dispatch]);

  useEffect(() => {
    setIsSelected(Array.isArray(rowSelected) && rowSelected.length > 0);
  }, [rowSelected]);

  // Grid ready
  const onGridReady = useCallback((params: AgGridEvent) => {
    setGridApiReady(params);
  }, []);

  // Delete multiple
  const deleteMultipleCameras = useCallback(async () => {
    if (!rowSelected || rowSelected.length === 0) return;

    const deleteMultiples = rowSelected.map((r) => r._id!).filter(Boolean);

    try {
      setIsDeleting(true);
      const response = await axiosAuth.delete("/camera/deletemany", { data: { deleteMultiples } });
      await getAllCameraDataFromBackEnd();
      toast.success(`Removed successfully — total deleted = ${response.data.message}`);
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsDeleting(false);
    }
  }, [rowSelected, getAllCameraDataFromBackEnd]);

  // File upload handler (form submit)
const onFileChange = (e) => {
  if (e.target.files && e.target.files.length > 0) {
    setFileName(e.target.files[0].name);
  }
};

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const input = fileInputRef.current;
      if (!input || !input.files || input.files.length === 0) {
        toast.error("Please select a CSV file.");
        return;
      }
      const file = input.files[0];
      const data = new FormData();
      data.set("file", file);
      setLoading(true)
      const response = await axiosAuth.post("/camera/bulk-import", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response.data)
      if (response?.data) {
        setLoading(false)
        await getAllCameraDataFromBackEnd();
        input.value = "";
        setFileName("")
        toast.success(response.data.message);
        // clear input
        
      }
    } catch (err) {
      errorHandler(err);
      // toast.info(err?.message);
    }
  }, [getAllCameraDataFromBackEnd]);
  // file name will display
 

  const [fileName, setFileName] = React.useState("");



  // play functions
  const playAllCamerasInNewTab = useCallback(() => {
    dispatch(handlePlayAllCameras(true));
    window.open("/user", "_blank", "noopener");
  }, [dispatch]);
// Autoplay
const autoPlayVideos = useCallback(() => {
    dispatch(handlePlayAllCameras(true));
    window.open("/user/autoplay", "_blank", "noopener");
  }, [dispatch]);
  const playSelectedCamerasInNewTab = useCallback(() => {
    if (!isSelected) return;
    dispatch(handlePlayAllCameras(false));
    window.open("/user/selected", "_blank", "noopener");
  }, [dispatch, isSelected]);

  // Actions cell renderer uses these handlers; keep stable references
  const actionsProps = useMemo(() => ({
    getUser: getAllCameraDataFromBackEnd,
    deleteCamera: deleteSingleCamera,
    handleDataUpdateOnEditButton,
  }), [getAllCameraDataFromBackEnd, deleteSingleCamera, handleDataUpdateOnEditButton]);

  // column definitions (memoized)
  const cameraColDefs: ColDef[] = useMemo(() => [
    {
      field: "name",
      headerName: "Name",
      // maxWidth: 320,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      filter: true,
      floatingFilter: true,
      flex: 1,
      
    },
    { field: "district", headerName: "District", filter: true },
    { field: "taluka", headerName: "Taluka", filter: true },
    { field: "city", headerName: "City", filter: true },
    { field: "area", headerName: "Location", filter: true, flex: 1 },
    {
      field: "isLive",
      headerName: "Status",
      filter: false,
      cellRenderer: (params: { value: boolean }) => {
        const live = params.value;
        return live ? <span className="text-yellow-400">LIVE</span> : <span className="text-red-600">OFFLINE</span>;
      },
      maxWidth: 100,
    },
    { field: "streamStart", headerName: "Stream Start", filter: false, maxWidth: 200 ,valueFormatter: (p) =>
    p.value ? new Date(p.value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "-",},
    { field: "streamEnd", headerName: "Stream End", filter: false, maxWidth: 200,valueFormatter: (p) =>
    p.value ? new Date(p.value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "-", },
    {
      field: "Action",
      filter: false,
      editable: false,
      maxWidth: 240,
      cellRenderer: (params: any) => <Actions {...actionsProps} params={params} />,
    },
  ], [actionsProps]);

  // Socket.io integration (stable connection)
  useEffect(() => {
    if (!userId) return;

    // create socket and store on ref
    const socket = io(process.env.NEXT_PUBLIC_ENV=="prod"?"https://www.hyperstream.in":"http://localhost:5000", {
      transports: ["websocket"],
  
      auth: { key: process.env.NEXT_PUBLIC_SOCKET_KEY },
      withCredentials: true,
      autoConnect: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      // Join user room
      socket.emit("joinRoom", userId);
    });

    socket.on("cameraUpdate", (data: any) => {
      console.log(data)
      // update rowData in-place for immediate UI updates
      if (!data) return;
      // naive update: replace matching streamId
      // setRowData((prev) => {
      //   if (!prev) return prev;
      //   return prev.map((c) => (c.streamId === data.streamId ? { ...c, ...data } : c));
      // });
      setRowData((prev) => {
  if (!prev || !Array.isArray(prev)) return [];

  const formattedData = {
    ...data,
    streamStart: data.streamStart
      ? new Date(data.streamStart).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : data.streamStart,
    streamEnd: data.streamEnd
      ? new Date(data.streamEnd).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : data.streamEnd,
  };

  const index = prev.findIndex((camera) => camera.streamId === formattedData.streamId);
  if (index !== -1) {
    const updated = [...prev];
    updated[index] = { ...updated[index], ...formattedData };
    return updated;
  } else {
    return [...prev, formattedData];
  }
});

       // ✅ Use proper Sonner toast
    console.log(data)
    data.isLive ? toast.success(`Stream online: ${data.name}`):toast.error(`Stream offline: ${data.name}`)
    // if(data.isLive){
    //   toast.success(`Stream online: ${data.name}`);
    // }
    // toast.error(`Stream offline: ${data.name}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, setRowData]);

  // handle editing action: open modal & setFormData (stable)
  const onEditRow = useCallback((row: camera) => {
    setFormData(row);
    dispatch(handleOpen());
  }, [dispatch, setFormData]);

  // wire Action -> handleDataUpdateOnEditButton expects camera; adapt
  useEffect(() => {
    // if hook's handleDataUpdateOnEditButton isn't bound to our onEditRow, it's fine:
    // We already pass handleDataUpdateOnEditButton to Actions in actionsProps.
    // onEditRow kept if you want to use it elsewhere.
  }, []);




  
 return (
  <>
    {/* Centered container for toolbar + table */}
    <div style={{ maxWidth: "90%", margin: "auto" }}>
      
      {/* ====== TOOLBAR ====== */}
      <div className="md:mb-1 xl:mb-3 3xl:mb-5">
        <main className="flex flex-wrap gap-5 items-center justify-between">
          {["admin", "superadmin"].includes(role) && (
          <div className="flex gap-5 items-center justify-left">
            

          {/* Upload Form */}
          <form className="flex gap-2 items-center " onSubmit={onSubmit}>
            <Tooltip arrow title="Click to upload CSV">
              <label
                htmlFor="file"
                className="cursor-pointer flex items-center gap-2 text-gray-300 dark:text-gray-200"
              >
                <DriveFolderUploadTwoToneIcon />
                <input
                  ref={fileInputRef}
                  required
                  name="file"
                  id="file"
                  type="file"
                  accept=".csv"
                  className="hidden"
                   onChange={onFileChange}
                />
                      <span>
        {fileName ? fileName :<span className="text-normal font-caveat capitalize text-zinc-400">select csv</span> }   {/* <-- SHOW FILE NAME */}
      </span>

              </label>
            </Tooltip>

            <Button type="submit" size="medium"  color="warning" variant="text">
             {isLoading ? "uploading..." :"upload"}
            </Button>
            
          </form>
          <Button
              color="secondary"
              size="medium"
              onClick={() => dispatch(handleOpen())}
              variant="contained"
              startIcon={<AddTwoToneIcon />}
              type="button"
            >
              Add Camera
            </Button>
            <Button
              onClick={deleteMultipleCameras}
              type="button"
              disabled={!isSelected}
              size="medium"
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
             
            >
              {isDeleting ? "Deleting..." : "Delete Many"}
            </Button>
              </div>
            )
              }
          {/* Add + Play + Delete Buttons */}
        
          <div className="flex flex-wrap gap-4 justify-end">
            
            {/* <Button
              color="secondary"
              size="medium"
              onClick={() => dispatch(handleOpen())}
              variant="contained"
              startIcon={<AddTwoToneIcon />}
              type="button"
            >
              Add Camera
            </Button> */}

            <Button
              disabled={!isSelected}
              onClick={playSelectedCamerasInNewTab}
              size="medium"
              variant="contained"
              startIcon={<SlowMotionVideoTwoToneIcon />}
              type="button"
            >
              Play Selected
            </Button>

            <Button
              disabled={!rowData || rowData.length === 0}
              onClick={playAllCamerasInNewTab}
              size="medium"
              variant="contained"
              color="success"
              startIcon={<PlayCircleTwoToneIcon />}
              type="button"
            >
              Play All
            </Button>
             <Button
              disabled={!rowData || rowData.length === 0}
              onClick={autoPlayVideos}
              size="medium"
              variant="contained"
              color="primary"
              startIcon={<LoopTwoToneIcon />}
              type="button"
            >
             Autoplay
            </Button>

            
          </div>
        </main>
      </div>

      {/* ====== TABLE ====== */}
      <div
        className="ag-theme-quartz-dark shadow-lg"
        style={{
          height,
          width: "100%",
          textAlign: "center",
          color: "green",
        }}
      >
        <AgGridReact
          defaultColDef={{ filter: true, floatingFilter: true, flex: 1 ,headerClass: "ag-header-center", }}
     
          columnDefs={cameraColDefs}
          rowData={rowData}
          rowSelection="multiple"
          suppressRowDeselection
          rowMultiSelectWithClick
          pagination
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          onRowSelected={(e) => {
            if (e.node.isSelected()) dispatch(onRowSelectedSlice(e.data as camera));
          }}
        />
      </div>
    </div>

    {/* ====== MODAL ====== */}
    <Modal open={isOpen} onClose={() => dispatch(handleClose())}>
      <Box>
        <ModalData
          handleFormSubmit={handleFormSubmit}
          handleClick={handleClick}
          formData={formData}
          setFormData={setFormData}
        />
      </Box>
    </Modal>
  </>
)};

  