/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Grid2,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { Authentication, logout } from "../firebase/auth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuIcon from "@mui/icons-material/Menu";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AssistantIcon from "@mui/icons-material/Assistant";
import ScienceIcon from "@mui/icons-material/Science";
import ChatIcon from '@mui/icons-material/Chat';
import { useRef } from "react";
import { Helmet } from "react-helmet";
import { Pengguna } from "../context/PenggunaContext";
import { memo } from "react";


const WaktuRealTime = () => {
  const timeRef = useRef();
  useEffect(() => {
    const parseWaktu = (waktu) => {
      return waktu > 9 ? waktu : `0${waktu}`;
    };

    const interval = setInterval(() => {
      const date = new Date();
      const hours = parseWaktu(date.getHours());
      const minutes = parseWaktu(date.getMinutes());
      const seconds = parseWaktu(date.getSeconds());
      timeRef.current.innerHTML = `${hours}:${minutes}:${seconds}`;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography ref={timeRef} variant="h6" fontSize={16} component="div">
      <Skeleton width="3.5rem" height="1.6rem" />
    </Typography>
  );
};

const HomeLayoutes = () => {
  const [openDraw, setOpenDraw] = useState(false);
  const { user } = Pengguna();
  const navigate = useNavigate();

  const menu = [
    { title: "dashboard", icon: <DashboardIcon /> },
    { title: "tugas", icon: <LibraryBooksIcon /> },
    { title: "assistant", icon: <AssistantIcon /> },
    { title: "member", icon: <Diversity3Icon /> },
    { title: "scient", icon: <ScienceIcon /> },
    { title: "Diskusi", icon: <ChatIcon /> }
  ];
  
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    const auth = Authentication(async (user) => {
      if (user && !user?.emailVerified) {
        navigate("/verify");
      } else if (!user) {
        navigate("/login");
      }
    });

    return () => auth;
  }, []);
  
  const Aside = (
    <Grid2
      component="aside"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      size={2}
      sx={{
        height: "100%",
        boxShadow: 3,
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "#fff",
        borderRadius: 3,
        p: 2,
      }}
    >
      <Stack component="section">
        <Box
          component="header"
          display="flex"
          alignItems="center"
          gap={1}
          mb={5}
        >
          <DeveloperBoardIcon sx={{ fontSize: 40, color: "main" }} />
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            fontFamily="Tillana, cursive"
          >
            MIPA T
          </Typography>
        </Box>
        <Box component="section" display="flex" flexDirection="column" gap={1}>
          {menu.map((item) => (
            <Button
              key={item.title}
              component={NavLink}
              to={`/${item.title}`}
              variant="text"
              startIcon={item.icon}
              style={({ isActive }) => ({
                color: isActive ? "#fff" : "black",
                backgroundColor: isActive ? "#06D001" : "#fff",
              })}
              sx={{
                color: "#000",
                fontSize: 16,
                fontWeight: "500",
                textTransform: "capitalize",
                justifyContent: "flex-start",
                "&:hover": {
                  bgcolor: "#06D001 !important",
                  color: "#fff !important",
                },
              }}
              onClick={() => setOpenDraw((openDraw) => !openDraw)}
            >
              {item.title}
            </Button>
          ))}
          <Typography
            variant="body2"
            component="span"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              bgcolor: "main",
              borderRadius: 2,
              mt: 2,
              width: "100%",
              py: 1,
              display: { xs: "flex", sm: "flex", md: "none" },
              justifyContent: "center",
              alignItems: "center",
              order: 3,
            }}
          >
            <WaktuRealTime />
          </Typography>
        </Box>
      </Stack>
      <Button
        component="button"
        variant="text"
        startIcon={<LogoutIcon />}
        sx={{
          color: "#000",
          fontSize: 16,
          fontWeight: "500",
          textTransform: "capitalize",
          justifyContent: "flex-start",
          "&:hover": { bgcolor: "#ff0000", color: "#fff" },
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Grid2>
  );

  return (
    <Fragment>
      <Helmet>
        <meta name="author" content="M. Rafly Saputra" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Grid2
        container
        spacing={2}
        sx={{
          height: "100vh",
          width: "100%",
          bgcolor: "rgb(240, 245, 249)",
          p: 2,
        }}
      >
        <Grid2
          component="aside"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          size={2}
          sx={{
            height: "100%",
            boxShadow: 3,
            overflowY: "auto",
            overflowX: "hidden",
            backgroundColor: "#fff",
            borderRadius: 3,
            p: 2,
            display: { xs: "none", sm: "none", md: "flex" },
          }}
        >
          <Stack component="section">
            <Box
              component="header"
              display="flex"
              alignItems="center"
              gap={1}
              mb={5}
            >
              <DeveloperBoardIcon sx={{ fontSize: 40, color: "main" }} />
              <Typography
                variant="h5"
                component="h1"
                fontWeight="bold"
                fontFamily="Tillana, cursive"
              >
                MIPA T
              </Typography>
            </Box>
            <Box
              component="section"
              display="flex"
              flexDirection="column"
              gap={1}
            >
              {menu.map((item) => (
                <Button
                  key={item.title}
                  component={NavLink}
                  to={`/${item.title}`}
                  variant="text"
                  startIcon={item.icon}
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "black",
                    backgroundColor: isActive ? "#06D001" : "#fff",
                  })}
                  sx={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "500",
                    textTransform: "capitalize",
                    justifyContent: "flex-start",
                    "&:hover": {
                      bgcolor: "#06D001 !important",
                      color: "#fff !important",
                    },
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          </Stack>
          <Button
            component="button"
            variant="text"
            startIcon={<LogoutIcon />}
            sx={{
              color: "#000",
              fontSize: 16,
              fontWeight: "500",
              textTransform: "capitalize",
              justifyContent: "flex-start",
              "&:hover": { bgcolor: "#ff0000", color: "#fff" },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid2>
        <Drawer
          open={openDraw}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": { width: 200 },
          }}
          onClose={() => setOpenDraw((openDraw) => !openDraw)}
        >
          {Aside}
        </Drawer>

        <Grid2
          size={{ xs: 12, sm: 12, md: 10 }}
          sx={{ height: "100%", overflowY: "auto", overflowX: "hidden", pb: 2 }}
        >
          <Stack
            component="nav"
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            sx={{
              py: 1,
              px: 2,
              width: "100%",
              bgcolor: "#fff",
              borderRadius: 3,
              boxShadow: 3,
              mb: 2,
            }}
          >
            <Stack
              component="section"
              direction="row"
              alignItems="center"
              gap={1}
            >
              <IconButton
                onClick={() => setOpenDraw((openDraw) => !openDraw)}
                sx={{
                  order: 1,
                  display: { xs: "flex", sm: "flex", md: "none" },
                }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton sx={{ order: 2 }}>
                <NotificationsIcon />
              </IconButton>
              <Typography
                variant="body2"
                component="span"
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  bgcolor: "main",
                  borderRadius: 2,
                  width: 70,
                  py: 1,
                  display: { xs: "none", sm: "none", md: "flex" },
                  justifyContent: "center",
                  alignItems: "center",
                  order: 3,
                }}
              >
                <WaktuRealTime />
              </Typography>
            </Stack>
            <Stack
              component="section"
              direction="row"
              alignItems="center"
              gap={1}
            >
              <Avatar
                alt={`${user?.username}`}
                sx={{ order: 2 }}
                src={user?.photoURL}
                component={NavLink}
                to="/profil"
              />
              <Typography variant="body2" component="span" sx={{ order: 1 }}>
                {user?.username || (
                  <Skeleton width="5rem" height="1.6rem" />
                )}
              </Typography>
            </Stack>
          </Stack>
          <Outlet />
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default HomeLayoutes;
