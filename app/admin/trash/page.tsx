
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import {
  Modal,
  IconButton,
  Button,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import NoAccountsTwoToneIcon from "@mui/icons-material/NoAccountsTwoTone";
import VideoCameraFrontTwoToneIcon from "@mui/icons-material/VideoCameraFrontTwoTone";
import KeyboardReturnTwoToneIcon from "@mui/icons-material/KeyboardReturnTwoTone";

import { user, usersData } from "@/typescript.definations";
import { axiosAuth } from "@/app/lib/axios";
import { errorHandler } from "@/hooks/useTableHook";
import Header from "@/components/Header";
import ChangeProfile from "@/components/modalTabs";
import AccessDenied from "@/components/http403";

function Trash() {
  const [users, setUsers] = useState<usersData>();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [clear, setClear] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [selectedUser, setSelectedUser] = useState<user | null>(null);

  // --- API Calls ---
  const getDisabledUsers = async () => {
    try {
      const response = await axiosAuth.get("/admin/users?isActive=false");
      if (response.data) setUsers(response.data);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setErrorState(true);
      }
    }
  };

  const getUserDetail = async (userId: string) => {
    try {
      const res = await axiosAuth.get(`/admin/users/${userId}`);
      if (res.data) {
        setSelectedUser(res.data.message);
        setOpen(true);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const searchUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosAuth.get(
        `/admin/users?isActive=false&email=${email}`
      );
      if (response.data) setUsers(response.data);
      setClear(true);
    } catch (error) {
      errorHandler(error);
    }
  };

  const clearSearch = async () => {
    setEmail("");
    setClear(false);
    await getDisabledUsers();
  };

  const deleteUser = async (userId: string) => {
    try {
      const res = await axiosAuth.delete(`/admin/users/${userId}`);
      toast.error(res.data?.message || "User deleted permanently");
      await getDisabledUsers();
    } catch (error) {
      errorHandler(error);
    }
  };

  const restoreUser = async (userId: string) => {
    try {
      const res = await axiosAuth.patch(`/admin/users/${userId}`, {
        isActive: true,
      });
      toast.success(res.data?.message || "User restored");
      await getDisabledUsers();
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getDisabledUsers();
  }, []);

  // --- UI ---
  if (errorState) return <AccessDenied />;

  return (
    <>
      <Header />
      <main className="text-slate-400 min-h-screen px-10 py-5 w-full">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-4 md:mx-6 lg:mx-10">
          {/* Search Bar */}
          <div className="col-span-full">
            <form onSubmit={searchUser} className="mb-5 w-full">
              <div className="flex justify-between items-center mb-2">
                <Typography
                  variant="h6"
                  className="text-white font-semibold tracking-wide"
                >
                  Search User by E-mail
                </Typography>
                <Button
                  color="inherit"
                  size="large"
                  startIcon={<KeyboardReturnTwoToneIcon />}
                  component={Link}
                  href="/admin"
                >
                  Back to Admin
                </Button>
              </div>

              <div className="flex gap-3">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter user email..."
                  className="text-zinc-700 pl-4 py-3 w-full rounded-md border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="px-6"
                >
                  Search
                </Button>
                <Button
                  onClick={clearSearch}
                  disabled={!clear}
                  variant="contained"
                  color="error"
                >
                  Clear
                </Button>
              </div>
            </form>
          </div>

          {/* User Cards */}
          {users?.message.length ? (
            users.message.map((u: user) => (
              <Box
                key={u._id}
                className="bg-stone-800 text-white italic rounded-md shadow-lg px-6 py-6 flex flex-col gap-5 transition-all duration-150 hover:scale-[1.01]"
              >
                <div className="flex justify-between items-center">
                  <Typography
                    variant="h6"
                    className="font-semibold text-center flex-1"
                  >
                    {`${u.username}'s Profile`}
                  </Typography>
                  <Tooltip title="Edit user" arrow>
                    <IconButton
                      color="warning"
                      onClick={() => getUserDetail(u._id)}
                    >
                      <EditTwoToneIcon />
                    </IconButton>
                  </Tooltip>
                </div>

                <div className="text-xl">
                  <strong className="text-red-500 font-semibold">Username:</strong>{" "}
                  {u.username}
                </div>
                <div className="text-xl">
                  <strong className="text-red-500 font-semibold">E-mail:</strong>{" "}
                  {u.email}
                </div>
                <div className="text-xl">
                  <strong className="text-red-500 font-semibold">Roles:</strong>{" "}
                  {u.roles}
                </div>

                <div className="flex justify-end gap-3 mt-2">
                  <Button
                    color="error"
                    variant="contained"
                    startIcon={<NoAccountsTwoToneIcon />}
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<VideoCameraFrontTwoToneIcon />}
                    component={Link}
                    href={`/dashboard/${u._id}`}
                  >
                    Cameras
                  </Button>
                  <Button
                    color="warning"
                    variant="text"
                    onClick={() => restoreUser(u._id)}
                  >
                    Restore
                  </Button>
                </div>
              </Box>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-600">
  <div className="text-7xl mb-4">🗑️</div>
  <h2 className="text-2xl font-semibold mb-2">No Disabled Users</h2>
  <p className="text-lg">Everything looks clean and active.</p>
</div>
          )}
        </section>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box>
            {selectedUser && (
              <ChangeProfile
                getAllUsers={getDisabledUsers}
                user={selectedUser}
                open={open}
                setIsopen={setOpen}
              />
            )}
          </Box>
        </Modal>
      </main>
    </>
  );
}

export default Trash;
