// "use client"
// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";

// import StreamIcon from '@mui/icons-material/Stream';
// import Link from "next/link";
// import { axiosAuth } from "@/app/lib/axios";
// import { useRouter } from "next/navigation";
// import { errorHandler } from "@/hooks/useTableHook";
// import { useAppDispatch } from "@/reduxtoolkit/store/Hooks";
// import { handleUserRoles } from "@/reduxtoolkit/features/userSlice";

// const pages = ["dashboard", "admin"];

// function ResponsiveAppBar() {
//   const dispatch=useAppDispatch()
//  const router=useRouter()
//   async function Logout(){
//     try {
//       const response= await axiosAuth.post("/auth/logout",{"withCredentials":true})
//       // console.log(response)
//       if(response.status===200){
//         dispatch(handleUserRoles(""))
//         router.push("/auth/login")
//       }

//     } catch (error:unknown) {
//       errorHandler(error)

//     }

//   }
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
//     null
//   );
//   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
//     null
//   );

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <StreamIcon color="warning" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
//           <Typography flexGrow="1"
//             variant="h6"
//             noWrap
//             textTransform={"uppercase"}
//             component={Link}
//             href="/dashboard"
//             sx={{

//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 500,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",

//             }}
//           >

//            <span className="font-caveat italic lowercase">HyperStream..</span>
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography  href={`/${page}`} component={Link} textTransform={"uppercase"} textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <StreamIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component={Link}
//             href="/dashboard"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 500,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             HyperStream
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <Button
//               component={Link}
//                href={`/${page}`}
//                 key={page}
//                 // onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: "whitesmoke", display: "block" }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//          <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="User settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="User" src="#" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >

//                 <MenuItem onClick={handleCloseUserMenu}>
//                   <Button component={Link} href={"/auth/profile"}>Profile</Button>
//                   {/* <Button component={Link} href={"/dashboard/import"}>bulk import</Button> */}
//                 </MenuItem>

//                     <MenuItem onClick={handleCloseUserMenu}>
//                     <Button onClick={Logout}>Logout</Button>
//                     </MenuItem>

//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;
// "use client";

// import * as React from "react";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   IconButton,
//   Typography,
//   Menu,
//   Container,
//   Avatar,
//   Button,
//   Tooltip,
//   MenuItem,
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import StreamIcon from "@mui/icons-material/Stream";
// import Link from "next/link";
// import { axiosAuth } from "@/app/lib/axios";
// import { useRouter } from "next/navigation";
// import { errorHandler } from "@/hooks/useTableHook";
// import { useAppDispatch } from "@/reduxtoolkit/store/Hooks";
// import { handleUserRoles } from "@/reduxtoolkit/features/userSlice";
// import { toast } from "sonner";

// const pages = [
//   { name: "dashboard", path: "/dashboard" },
//   { name: "admin", path: "/admin" },
// ];

// export default function ResponsiveAppBar() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   // ----------------------------------
//   // 🔹 Handle Logout
//   // ----------------------------------
//   async function handleLogout() {
//     try {
//       const response = await axiosAuth.post(
//         "/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//       if (response.status === 200) {
//         toast.success("Logged out successfully!");
//         dispatch(handleUserRoles(""));
//         router.push("/auth/login");
//       }
//     } catch (error: unknown) {
//       errorHandler(error);
//     }
//   }

//   // ----------------------------------
//   // 🔹 State for Menus
//   // ----------------------------------
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
//     null
//   );
//   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
//     null
//   );

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
//     setAnchorElNav(event.currentTarget);
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
//     setAnchorElUser(event.currentTarget);

//   const handleCloseNavMenu = () => setAnchorElNav(null);
//   const handleCloseUserMenu = () => setAnchorElUser(null);

//   // ----------------------------------
//   // 🔹 Component Render
//   // ----------------------------------
//   return (
//     <AppBar
//       position="static"
//       color="primary"
//       sx={{ backgroundColor: "#1976d2" }}
//     >
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* Logo for Desktop */}
//           <StreamIcon
//             color="warning"
//             sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
//           />

//           <Typography
//             variant="h6"
//             noWrap
//             component={Link}
//             href="/dashboard"
//             sx={{
//               mr: 4,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 600,
//               letterSpacing: ".2rem",
//               color: "inherit",
//               textDecoration: "none",
//               textTransform: "uppercase",
//               flexGrow: 1,
//             }}
//           >
//             <span className="font-caveat italic lowercase">HyperStream..</span>
//           </Typography>

//           {/* Mobile Menu Icon */}
//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="menu"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>

//             {/* Mobile Dropdown Menu */}
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//               keepMounted
//               transformOrigin={{ vertical: "top", horizontal: "left" }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: "block", md: "none" } }}
//             >
//               {pages.map(({ name, path }) => (
//                 <MenuItem key={name} onClick={handleCloseNavMenu}>
//                   <Typography
//                     component={Link}
//                     href={path}
//                     textAlign="center"
//                     sx={{
//                       textTransform: "uppercase",
//                       color: "inherit",
//                       textDecoration: "none",
//                     }}
//                   >
//                     {name}
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           {/* Mobile Title */}
//           <StreamIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component={Link}
//             href="/dashboard"
//             sx={{
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontWeight: 600,
//               letterSpacing: ".2rem",
//               color: "inherit",
//               textDecoration: "none",
//               textTransform: "uppercase",
//             }}
//           >
//             HyperStream
//           </Typography>

//           {/* Desktop Navigation */}
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map(({ name, path }) => (
//               <Button
//                 component={Link}
//                 href={path}
//                 key={name}
//                 sx={{
//                   my: 2,
//                   color: "whitesmoke",
//                   display: "block",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 {name}
//               </Button>
//             ))}
//           </Box>

//           {/* User Avatar */}
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="User settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="User" src="#" />
//               </IconButton>
//             </Tooltip>

//             {/* User Dropdown */}
//             <Menu
//               sx={{ mt: 1 }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{ vertical: "top", horizontal: "right" }}
//               keepMounted
//               transformOrigin={{ vertical: "top", horizontal: "left" }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               <MenuItem onClick={handleCloseUserMenu}>
//                 {/* <Button component={Link} href="/auth/profile" sx={{ color: "inherit" }}> */}
//                 <Link href="/auth/profile" passHref legacyBehavior>
//                   <Button>Profile</Button>
//                 </Link>
//               </MenuItem>

//               <MenuItem onClick={handleCloseUserMenu}>
//                 <Button onClick={handleLogout} sx={{ color: "error.main" }}>
//                   Logout
//                 </Button>
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
"use client";

import * as React from "react";
 
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import StreamIcon from "@mui/icons-material/Stream";
import LoopTwoToneIcon from '@mui/icons-material/LoopTwoTone';
import Link from "next/link";
import { axiosAuth } from "@/app/lib/axios";
import { useRouter } from "next/navigation";
import { errorHandler } from "@/hooks/useTableHook";
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import { handleUserRoles } from "@/reduxtoolkit/features/userSlice";
import { toast } from "sonner";

const pages = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Admin", path: "/admin" },
];

export default function ResponsiveAppBar() {
  const { username } = useAppSelector((s) => s.root.userRole);
  const dispatch = useAppDispatch();
  const router = useRouter();
 console.log(username)

  // ----------------------------------
  // 🔹 Logout Handler
  // ----------------------------------
  // const handleLogout = async () => {
  //   try {
  //     const response = await axiosAuth.post("/auth/logout", {}, { withCredentials: true });
  //     if (response.status === 200) {
  //       toast.success("Logged out successfully!");
  //       dispatch(handleUserRoles(""));
  //       router.push("/auth/login");
  //     }
  //   } catch (error: unknown) {
  //     errorHandler(error);
  //   }
  // };
  const handleLogout = async () => {
  try {
    // Close any open menus before navigation
    setAnchorElUser(null);
    setAnchorElNav(null);

    // Immediately clear any active toasts
    toast.dismiss();

    // Call your backend logout API
    const response = await axiosAuth.post("/auth/logout", {}, { withCredentials: true });

    if (response.status === 200) {
      // Show success message briefly
      // toast.success("Logged out successfully!");

      // Reset Redux state synchronously
      dispatch(handleUserRoles(""));

      // Wait a bit to let Menu/Toast animations finish
      setTimeout(() => {
        router.replace("/auth/login");
      }, 250);
    }
  } catch (error) {
    toast.dismiss();
    errorHandler(error);
  }
};


  // ----------------------------------
  // 🔹 Menu States
  // ----------------------------------
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
   const firstLetter =username?.charAt(0)?.toUpperCase() || "U";
  // ----------------------------------
  // 🔹 Component Render
  // ----------------------------------
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(25, 118, 210, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo (Desktop) */}
            <StreamIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} color="warning" />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/dashboard"
              sx={{
                mr: 4,
                display: { xs: "none", md: "flex" },
                fontWeight: 600,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
                flexGrow: 1,
              }}
            >
              <span className="font-caveat italic lowercase">HyperStream..</span>
            </Typography>

            {/* Mobile Menu Button */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" aria-label="menu" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>

              {/* Mobile Dropdown */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map(({ name, path }) => (
                  <MenuItem key={name} onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      href={path}
                      textAlign="center"
                      sx={{
                        color: "inherit",
                        textDecoration: "none",
                        textTransform: "uppercase",
                      }}
                    >
                      {name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile Logo */}
            <StreamIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/dashboard"
              sx={{
                flexGrow: 1,
                fontWeight: 600,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
                display: { xs: "flex", md: "none" },
              }}
            >
              HyperStream
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ name, path }) => (
                <Button
                  key={name}
                  component={Link}
                  href={path}
                  sx={{
                    my: 2,
                    color: "whitesmoke",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    "&:hover": { color: "#ffca28" },
                  }}
                >
                  {name}
                </Button>
              ))}
            </Box>

            {/* Avatar Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="User Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
  sx={{
    bgcolor: "#ffca28",
    color: "#333",
    fontWeight: 600,
    textTransform: "uppercase",
  }}
>
  {firstLetter}
</Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: 1 }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href="/auth/profile" passHref legacyBehavior>
                    <Button>Profile</Button>
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Button onClick={handleLogout} sx={{ color: "error.main" }}>
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Space below fixed AppBar */}
      <Toolbar />
    </>
  );
}
