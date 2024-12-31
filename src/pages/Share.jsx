/* eslint-disable no-unused-vars */
import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { Fragment, useState } from "react";
import { addData } from "../firebase/database";
import { MixinAlert } from "../assets/sweetalert";
import { Pengguna } from "../context/PenggunaContext";
import { useNavigate } from "react-router";

const Share = () => {
  const { role } = Pengguna();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const generateUniqueId = () => {
    return (
      Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
    );
  };

  const handleTrashInput = () => {
    setJudul("");
    setDeskripsi("");
  };  

  useEffect(() => {
    {role && role != "admin" && navigate("/")}
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uid = generateUniqueId();
      const time = new Date().toLocaleTimeString();
      let date = new Date().toLocaleDateString().split("/");
      date = `${date[1]}/${date[0]}/${date[2]}`;
      const createAt = `${date} ${time}`;
      const data = {uid, judul, deskripsi, createAt};
      const response = await addData(data, "share");
      MixinAlert("success", response);
      handleTrashInput();
    } catch (error) {
      MixinAlert("error", error);
    }

  }

  useEffect(() => {
    if(judul && deskripsi){
      setDisabled(false);
    } else {
      setDisabled(true);
    }

  },[judul, deskripsi])

  return (
    <Fragment>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
          <TextField label="Judul" value={judul} fullWidth onChange={(e) => setJudul(e.target.value)} sx={{mb: { xs: 2, md: 0 }}}/>
          <TextField label="Deskripsi" value={deskripsi} multiline fullWidth onChange={(e) => setDeskripsi(e.target.value)}/>
        </Stack>
        <Button type="submit" variant="contained" sx={{ bgcolor: "main" }} disabled={disabled}>Kirim</Button>
      </Box>
    </Fragment>
  )
}

export default Share;
