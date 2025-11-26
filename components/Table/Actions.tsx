

"use client";

import React from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { IconButton, Tooltip } from "@mui/material";
import PlayCircleFilledWhiteTwoToneIcon from '@mui/icons-material/PlayCircleFilledWhiteTwoTone';

import { axiosAuth } from "@/app/lib/axios";
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import { createSelector } from "@reduxjs/toolkit";
import { handleIsOpenActionModal } from "@/reduxtoolkit/features/ModalSlice";
import { currentCameraDetail } from "@/reduxtoolkit/features/cameraSlice";
function ActionsComponent(props: any) {
const dispatch=useAppDispatch()
 


const selectUserAndCamera = createSelector(
  (state) => state.root.userRole.role,
  (state) => state.root.userRole.userId,
  (state) => state.root.cameras.currentCamera,
  (role, userId, currentCamera) => ({ role, userId, currentCamera })
);

const { role, userId, currentCamera } = useAppSelector(selectUserAndCamera);
function onPlayButtonClick(){
  
  dispatch(handleIsOpenActionModal(true))
  dispatch(currentCameraDetail(props.params.data))
}
  async function disableCamera(id: string) {
    try {
      const response = await axiosAuth.patch(`/camera/disable/${id}`, { isActive: false });
      if (response.data.message) {
        props.getUser();
      }
    } catch (error) {
      console.error("Failed to disable camera:", error);
    }
  }
   
  return role && role !== "user" ? (
    <main>
      <div className="flex gap-2">
        <Tooltip title="play stream">
          <IconButton size="small" onClick={onPlayButtonClick}>
            <PlayCircleFilledWhiteTwoToneIcon color="success" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Detail">
          <IconButton size="small" onClick={() => props.handleDataUpdateOnEditButton(props.params.data)}>
            <EditTwoToneIcon color="warning" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Permanent">
          <IconButton size="small" onClick={() => props.deleteCamera(props.params.data._id)}>
            <DeleteTwoToneIcon color="error" />
          </IconButton>
        </Tooltip>
      </div>
    </main>
  ) : (
    <Tooltip title="play stream">
          <IconButton size="small" onClick={onPlayButtonClick}>
            <PlayCircleFilledWhiteTwoToneIcon color="success" />
          </IconButton>
        </Tooltip>
  );
}

export default React.memo(ActionsComponent);
