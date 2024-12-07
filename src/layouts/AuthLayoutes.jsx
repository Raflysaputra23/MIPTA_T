/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Container } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Authentication } from "../server/auth";

const AuthLayoutes = ({ auth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = Authentication((user) => {
      if (user && user?.emailVerified) {
        navigate("/dashboard");
      } else if (user && !user?.emailVerified) {
        navigate("/verify");
      }
    });
    return () => unsubscribe; // Bersihkan listener saat komponen unmounted
  }, []);

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
        overflowY: "auto",
        bgcolor: "rgb(240, 245, 249)",
        pt: 6,
        pb: 4,
      }}
    >
      <Outlet />
    </Container>
  );
};

export default AuthLayoutes;
