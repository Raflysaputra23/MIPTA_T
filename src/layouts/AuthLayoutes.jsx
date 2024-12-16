import { Container } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Authentication } from "../firebase/auth";
import { Helmet } from "react-helmet";
import { Fragment } from "react";

const AuthLayoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = Authentication((user) => {
      if (user && user?.emailVerified) {
        navigate("/dashboard");
      } else if (user && !user?.emailVerified) {
        navigate("/verify");
      }
    });
    return () => unsubscribe; 
  }, []);

  return (
    <Fragment>
      <Helmet>
        <meta name="author" content="M. Rafly Saputra" />
        <meta name="robots" content="index, follow" />
      </Helmet>
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
    </Fragment>
  );
};

export default AuthLayoutes;
