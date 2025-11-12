"use client";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { IconButton, Tooltip } from "@mui/material";
import { axiosAuth } from "@/app/lib/axios";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import { useAppSelector } from "@/reduxtoolkit/store/Hooks";
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';

function Actions(props: any) {
  // ✅ Hooks must be called at the top level
  const { role, userId } = useAppSelector((store) => store.root.userRole);

  async function disableCamera(id: string) {
    try {
      const response = await axiosAuth.patch(`/camera/disable/${id}`, { isActive: false });
      if (response.data.message) {
        props.getUser(); // refresh data after disabling
      }
    } catch (error) {
      console.error("Failed to disable camera:", error);
    }
  }

  // ✅ Correct JSX return
  return (
    role !== "user" ? (
      <main>
        <div className="flex gap-2">
          <Tooltip title="Edit Detail">
            <IconButton
              size="small"
              onClick={() => props.handleDataUpdateOnEditButton(props.params.data)}
            >
              <EditTwoToneIcon color="warning" />
            </IconButton>
          </Tooltip>

          {/* Enable when ready */}
          {/* <Tooltip title="Disable Camera">
            <IconButton size="small" onClick={() => disableCamera(props.params.data._id)}>
              <NoPhotographyIcon color="primary" />
            </IconButton>
          </Tooltip> */}

          <Tooltip title="Delete Permanent">
            <IconButton
              size="small"
              onClick={() => props.deleteCamera(props.params.data._id)}
            >
              <DeleteTwoToneIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>
      </main>
    ) : (
      <Tooltip title="Locked">
            <IconButton
              size="small"
              // onClick={() => props.handleDataUpdateOnEditButton(props.params.data)}
            >
              <LockTwoToneIcon color="error" />
            </IconButton>
          </Tooltip>
    )
  );
}

export default Actions;
