import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { Authentication } from "../firebase/auth";
import { useNavigate } from "react-router";
import { MixinAlert } from "../assets/sweetalert";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Verify = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = Authentication((user) => {
      if (user && user?.emailVerified) {
        MixinAlert("success", "Email sudah terverifikasi");
        navigate("/dashboard");
      } else if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe; 
  }, []);

  return (
    <Fragment>
      <Helmet>
        <meta name="description" content="Halaman verifikasi email" />
        <meta name="keywords" content="Aplikasi MIPA T" />
      </Helmet>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography
          variant="h2"
          align="center"
          fontFamily="Tillana, cursive"
          borderBottom={2}
          gutterBottom
        >
          MIPA T
        </Typography>
        <Typography variant="h4" align="center" fontWeight="bold">
          Verifikasi Email Anda
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Verify email sudah dikirim ke email anda
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={2} my={3}>
          <CircularProgress color="inherit" size={30} />
        </Stack>
      </Paper>
    </Fragment>
  );
};

export default Verify;
