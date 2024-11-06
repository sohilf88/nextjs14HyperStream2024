"use client"
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import StreamIcon from '@mui/icons-material/Stream';
import Link from "next/link";
import { axiosAuth } from "@/app/lib/axios";
import { useRouter } from "next/navigation";
import { errorHandler } from "@/hooks/useTableHook";
import { useAppDispatch } from "@/reduxtoolkit/store/Hooks";
import { handleUserRoles } from "@/reduxtoolkit/features/userSlice";


const pages = ["dashboard", "admin"];


function ResponsiveAppBar() {
  const dispatch=useAppDispatch()
 const router=useRouter()
  async function Logout(){
    try {
      const response= await axiosAuth.post("/auth/logout",{"withCredentials":true})
      // console.log(response)
      if(response.status===200){
        dispatch(handleUserRoles(""))
        router.push("/auth/login")
      }
      
    } catch (error:unknown) {
      errorHandler(error)
      
    }
   
  }
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StreamIcon color="warning" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography flexGrow="1"
            variant="h6"
            noWrap
            textTransform={"uppercase"}
            component={Link}
            href="/dashboard"
            sx={{
              
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              
            }}
          >
           <span className="font-caveat italic lowercase">HyperStream..</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography  href={`/${page}`} component={Link} textTransform={"uppercase"} textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <StreamIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HyperStream
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
              component={Link}
               href={`/${page}`}
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "whitesmoke", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

         <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="#" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
              
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button component={Link} href={"/auth/profile"}>Profile</Button>
                  {/* <Button component={Link} href={"/dashboard/import"}>bulk import</Button> */}
                </MenuItem>
                
                    <MenuItem onClick={handleCloseUserMenu}> 
                    <Button onClick={Logout}>Logout</Button>
                    </MenuItem>
                   
                   
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
