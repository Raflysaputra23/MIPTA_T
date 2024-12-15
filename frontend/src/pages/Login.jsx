/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Authentication,
  daftarWithGoogle,
  loginWithManual,
  resetPassword,
} from "../firebase/auth";
import { MixinAlert } from "../assets/sweetalert";

const Login = () => {
  const [iconPassword, setIconPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [ingat, setIngat] = useState(false);
  const navigate = useNavigate();

  const handleTrashInput = () => {
    setEmail("");
    setPassword("");
  } 

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginWithManual(email,password);
      MixinAlert("success", response);
    }catch (error) {
      MixinAlert("error", error);
      handleTrashInput();
    }
  };

  const handleLoginByGoogle = async (e) => {
    e.preventDefault();
    try {
      const response = await daftarWithGoogle();
      MixinAlert("success", response);
    } catch (error) {
      MixinAlert("error", error);
    }
  };

  return (
    <Paper
      component="form"
      elevation={3}
      sx={{ p: 2, width: 350, maxWidth: 350, bgcolor: "#fff" }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Masuk
      </Typography>
      <TextField
        type="text"
        id="email"
        label="Email"
        name="email"
        variant="standard"
        helperText="Masukkan Email"
        value={email}
        required
        fullWidth
        autoFocus
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton size="medium">
                <PersonIcon />
              </IconButton>
            ),
          },
        }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type={iconPassword ? "text" : "password"}
        id="password"
        label="Password"
        name="password"
        variant="standard"
        helperText="Masukkan password"
        value={password}
        required
        fullWidth
        sx={{  }}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                size="medium"
                onClick={() => setIconPassword(!iconPassword)}
              >
                {iconPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            ),
          },
        }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Typography align="right" fontSize={13} mb={2}>
        <NavLink to="/reset-password">Lupa Password?</NavLink>
      </Typography>
        {/* <FormControlLabel
          sx={{ mb: 2 }}
          control={
            <Checkbox
              size="small"
              checked={ingat}
              onChange={(e) => setIngat(e.target.checked)}
            />
          }
          label="Ingat saya"
        /> */}
      <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
        Masuk
      </Button>
      <Button
        type="submit"
        variant="outlined"
        fullWidth
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          textTransform: "capitalize",
        }}
        onClick={handleLoginByGoogle}
      >
        <GoogleIcon />
        Google
      </Button>
      <Typography variant="body2" component="p" align="center" gutterBottom>
        Belum punya akun? <NavLink to="/register">Daftar</NavLink>
      </Typography>
    </Paper>
  );
};

export default Login;
