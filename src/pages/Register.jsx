/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { Authentication, daftarWithManual } from "../firebase/auth";
import { MixinAlert } from "../assets/sweetalert";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [kelas, setKelas] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [helperEmail, setHelperEmail] = useState(false);
  const [iconPassword, setIconPassword] = useState(false);
  const [iconPassword2, setIconPassword2] = useState(false);
  const navigate = useNavigate();

  const handleTrashInput = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setKelas("");
  };

  const handleEmail = (e) => {
    e.preventDefault();

    if (!e.target.value) {
      setHelperEmail(false);
    } else if (!e.target.validity.valid) {
      setHelperEmail(true);
    } else if (e.target.validity.valid) {
      setHelperEmail(false);
    }

    return e.target.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataUser = {
      username,
      kelas,
      role: "user",
      photoURL: "",
      createAt: new Date(),
    };
    try {
      const response = await daftarWithManual(email, password, dataUser);
      MixinAlert("success", response);
    } catch (error) {
      MixinAlert("error", error);
      handleTrashInput();
    }
  };

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
        <title>Register - MIPA T</title>
        <meta name="description" content="Sebuah halaman register MIPA T" />
        <meta name="keywords" content="Aplikasi MIPA T Register" />
      </Helmet>
      <Paper
        component="form"
        elevation={3}
        sx={{ p: 2, width: 350, maxWidth: 350, bgcolor: "#fff" }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Daftar
        </Typography>
        <TextField
          type="text"
          id="username"
          label="Username"
          name="username"
          variant="standard"
          minLength={4}
          helperText={
            !!username && username.length < 4
              ? "Minimal 4 huruf"
              : !!username
              ? "Mantap"
              : "Masukkan username"
          }
          error={!!username && username.length < 4}
          value={username}
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
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="email"
          id="email"
          label="Email"
          name="email"
          variant="standard"
          helperText={
            helperEmail
              ? "Masukkan email valid"
              : !!email
              ? "Mantap"
              : "Masukkan email"
          }
          error={helperEmail}
          value={email}
          required
          fullWidth
          sx={{ mb: 2 }}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton size="medium">
                  <AlternateEmailIcon />
                </IconButton>
              ),
            },
          }}
          onChange={(e) => setEmail(handleEmail(e))}
        />
        <FormControl fullWidth variant="standard" required>
          <InputLabel id="demo-simple-select-label">Kelas</InputLabel>
          <Select
            labelId="kelasLabel"
            id="kelas"
            label="Kelas"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            name="kelas"
          >
            <MenuItem value={`A`}>A</MenuItem>
            <MenuItem value={`B`}>B</MenuItem>
          </Select>
          <FormHelperText>Harap pilih kelas</FormHelperText>
        </FormControl>
        <TextField
          type={iconPassword ? "text" : "password"}
          id="password"
          label="Password"
          name="password"
          variant="standard"
          helperText={
            !!password && password.length < 6
              ? "Minimal 6 huruf"
              : !!password
              ? "Mantap"
              : "Masukkan password"
          }
          error={!!password && password.length < 6}
          value={password}
          required
          fullWidth
          sx={{ mb: 1 }}
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
        <TextField
          type={iconPassword2 ? "text" : "password"}
          id="password2"
          label="Confirm Password"
          name="password2"
          variant="standard"
          helperText={
            !!password2 && password2.length < 6
              ? "Minimal 6 huruf"
              : !!password2
              ? "Mantap"
              : "Masukkan password"
          }
          error={!!password2 && password !== password2}
          value={password2}
          required
          fullWidth
          sx={{ mb: 1 }}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton
                  size="medium"
                  onClick={() => setIconPassword2(!iconPassword2)}
                >
                  {iconPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              ),
            },
          }}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="error"
          sx={{ mb: 2 }}
        >
          Daftar
        </Button>
        <Typography variant="body2" component="p" align="center" gutterBottom>
          Sudah punya akun? <NavLink to="/login">Masuk</NavLink>
        </Typography>
      </Paper>
    </Fragment>
  );
};

export default Register;
