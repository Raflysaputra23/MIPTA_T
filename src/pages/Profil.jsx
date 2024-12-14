/* eslint-disable no-unused-vars */
import {
  Avatar,
  Button,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcons from "@mui/icons-material/Save";
import LockResetIcon from '@mui/icons-material/LockReset';
import { useEffect } from "react";
import { Authentication } from "../server/auth";
import { readDataAll, readDataSingle, updateData } from "../server/database";
import { useNavigate } from "react-router";
import { useState } from "react";
import { MixinAlert } from "../assets/sweetalert";

const Profil = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [uid, setUid] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [kelas, setKelas] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(username && email) {
      setDisable(false);
    } else {
      setDisable(true);
    }

    return e.target.value;
  }

  const handleForm = async (e) => {
    e.preventDefault();
    try {
        const data = { username, email, kelas, role, photoURL };
        const response = await updateData(uid, data);
        MixinAlert("success", response);
        setDisable(true);
    } catch (error) {
        MixinAlert("error", error);
        setDisable(true);
    }
  }

  useEffect(() => {
    const unsubscribe = Authentication(async (user) => {
      if (user && !user?.emailVerified) {
        navigate("/verify");
      } else if (!user) {
        navigate("/login");
      }

      const response = await readDataSingle(user?.uid);
      const { uid , username, email, kelas, role, photoURL} = response;
      setUid(uid);
      setUsername(username);
      setEmail(email);
      setKelas(kelas);
      setRole(role);
      setPhotoURL(photoURL);
    });
    return () => unsubscribe;
  }, []);

  return (
    <Grid2 container spacing={2} justifyContent="center">
      <Grid2 size={{ xs: 10, sm: 10, md: 4 }}>
        <Paper elevation={3}>
          <Avatar
            alt={username}
            src={photoURL}
            sx={{
              width: "100%",
              height: 350,
              borderRadius: 3,
              backgroundColor: "transparent",
              color: "#ddd",
            }}
          />
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 12, md: 8 }}>
        <Paper evaluation={3} component="form" sx={{ p: 2 }} onSubmit={handleForm}>
          <TextField
            variant="outlined"
            fullWidth
            value={username}
            label="Nama Lengkap"
            sx={{ mb: 2 }}
            onChange={(e) => setUsername(handleSubmit(e))}
            required
          />
          <TextField
            variant="outlined"
            fullWidth
            value={email}
            label="Email"
            sx={{ mb: 2 }}
            onChange={(e) => setEmail(handleSubmit(e))}
            slotProps={{ 
                input: {
                 readOnly: true,
                 endAdornment: (
                    <Typography fontFamily="Tillana, cursive" color="success">Verifed</Typography>
                 ) 
                } 
            }}
            required
          />
          <Stack direction="row" spacing={2} alignContent="center" mb={2}>
            <FormControl fullWidth variant="outlined" required sx={{ mb: 3 }}>
                <InputLabel id="demo-simple-select-label">Kelas</InputLabel>
                <Select
                labelId="kelasLabel"
                id="kelas"
                label="Kelas"
                name="kelas"
                value={kelas}
                onChange={(e) => setKelas(handleSubmit(e))}
                >
                <MenuItem value={`A`}>A</MenuItem>
                <MenuItem value={`B`}>B</MenuItem>
                </Select>
            </FormControl>
            <TextField
            variant="outlined"
            fullWidth
            value={role}
            label="Role"
            sx={{ mb: 2 }}
            onChange={(e) => setRole(handleSubmit(e))}
            slotProps={{ 
                input: {
                 readOnly: true
                } 
            }}
            required
          />
          </Stack>
          <Stack direction="row" justifyContent="space-between" my={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              startIcon={<SaveIcons />}
              disabled={disable}
            >
              Simpan
            </Button>
            {/* <Button
              type="button"
              variant="contained"
              sx={{ textTransform: "capitalize", bgcolor: "#ff0000" }}
              startIcon={<LockResetIcon />}
            >
              Ubah Password
            </Button> */}
          </Stack>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Profil;
