import { Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { resetPassword } from "../server/auth";
import { MixinAlert } from "../assets/sweetalert";


const ResetPassword = () => {
  const [ email, setEmail ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await resetPassword(email);
      MixinAlert("success", response);
      setEmail("");
    } catch (error) {
      MixinAlert("error", error);
      setEmail("");
    }
  }

  return (
    <Paper component="form" elevation={3} sx={{ p: 2 }} onSubmit={handleSubmit}>
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
        Reset Password
      </Typography>
      <TextField
        autoFocus
        label="Masukkan email yang tertaut"
        value={email}
        variant="outlined"
        type="email"
        fullWidth
        sx={{ my: 2 }}
        onChange={(e) => setEmail(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton ><AlternateEmailIcon /></IconButton>
            )
          }
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!email}
        sx={{ mb: 2 }}
      >
        Kirim Verifikasi
      </Button>
    </Paper>
  )
}

export default ResetPassword;
