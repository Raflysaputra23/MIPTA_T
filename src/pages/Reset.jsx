/* eslint-disable no-unused-vars */
import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { confirmResetPassword } from "../firebase/auth";
import { MixinAlert } from "../assets/sweetalert";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSearchParams } from "react-router";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [iconPassword, setIconPassword] = useState(false);
  const [iconPassword2, setIconPassword2] = useState(false);
  const token = searchParams.get("oobCode");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        MixinAlert("error", "URL Tidak Valid");
        navigate("/login");
      } else {
        await confirmResetPassword(token, password);
        MixinAlert("success", "Reset Password Berhasil");
        navigate("/login");
      }
    } catch (error) {
      MixinAlert("error", error);
      navigate("/login");
    }
  };
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <Fragment>
      <Helmet>
        <meta name="description" content="Halaman reset password" />
        <meta name="keywords" content="Aplikasi MIPA T" />
      </Helmet>
      <Paper
        component="form"
        elevation={3}
        sx={{ p: 2 }}
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h2"
          align="center"
          fontFamily="Tillana, cursive"
          borderBottom={2}
          gutterBottom
        >
          MIPA T
        </Typography>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Ganti Password Anda
        </Typography>
        <TextField
          label="Password Baru"
          value={password}
          variant="outlined"
          type={iconPassword ? "text" : "password"}
          fullWidth
          sx={{ mt: 2 }}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={() => setIconPassword(!iconPassword)}>
                  {iconPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              ),
            },
          }}
        />
        <TextField
          label="Confirm Password"
          value={confirmPassword}
          variant="outlined"
          type={iconPassword2 ? "text" : "password"}
          helperText={password !== confirmPassword ? "Password Tidak Sama" : ""}
          error={password !== confirmPassword}
          fullWidth
          sx={{ my: 2 }}
          onChange={(e) => setConfirmPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={() => setIconPassword2(!iconPassword2)}>
                  {iconPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              ),
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
        >
          Ganti Password
        </Button>
      </Paper>
    </Fragment>
  );
};

export default ResetPassword;
