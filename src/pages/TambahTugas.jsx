/* eslint-disable no-unused-vars */
import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { MixinAlert } from "../assets/sweetalert";
import { addData } from "../firebase/database";
import { Helmet } from "react-helmet";
import { useUser } from "../context/UserProvider";

const TambahTugas = () => {
  const { user } = useUser();
  const [kelas, setKelas] = useState("");
  const [matkul, setMatkul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("dd/mm/yyyy");
  const [deadlineTime, setDeadlineTime] = useState("23:59");
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  
  const handleTrashInput = () => {
    setMatkul("");
    setDeadlineDate("");
    setDeadlineTime("");
    setDeskripsi("");
    setKelas("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const generateUniqueId = () => {
      return (
        Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
      );
    };

    const uid = generateUniqueId();
    const createAt = new Date().toISOString().split("T")[0];
    const formattedDateTime = `${deadlineDate} ${deadlineTime}`;
    try {
      const data = {
        uid,
        matkul,
        deskripsi,
        dedline: formattedDateTime,
        kelas,
        createAt,
        author: user.username
      };
      const response = await addData(data, "tugas");
      MixinAlert("success", response);
      navigate("/tugas");
    } catch (error) {
      MixinAlert("error", error);
      handleTrashInput();
    }
  };

  useEffect(() => {
    if (matkul && deskripsi && deadlineDate && kelas) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [matkul, deskripsi, deadlineDate, deadlineTime, kelas]);

  return (
    <Fragment>
      <Helmet>
        <meta
          name="description"
          content="Halaman tambah tugas untuk menambahkan tugas dan memanage waktu dedline"
        />
        <meta name="keywords" content="Aplikasi MIPA T" />
      </Helmet>
      <Stack direction="row" alignItems="center" my={2}>
        <Button
          component={NavLink}
          variant="contained"
          to="/tugas"
          sx={{ bgcolor: "main" }}
          startIcon={<ArrowBackIcon />}
        >
          Kembali
        </Button>
      </Stack>
      <Grid2
        container
        component={"form"}
        justifyContent={{ xs: "center", sm: "start" }}
        mt={4}
        spacing={2}
        onSubmit={handleSubmit}
      >
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            type="text"
            name="matkul"
            value={matkul}
            label="Matkul"
            variant="outlined"
            onChange={(e) => setMatkul(e.target.value)}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            type="text"
            name="deskripsi"
            value={deskripsi}
            label="Deskripsi"
            variant="outlined"
            onChange={(e) => setDeskripsi(e.target.value)}
            multiline
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
          <Stack direction="row" spacing={2}>
            <TextField
              type="date"
              name="deadlineDate"
              value={deadlineDate}
              label="Dedline Date"
              variant="outlined"
              onChange={(e) => setDeadlineDate(e.target.value)}
              fullWidth
              required
            />
            <TextField
              type="time"
              name="Deadline Time"
              value={deadlineTime}
              label="Dedline"
              variant="outlined"
              onChange={(e) => setDeadlineTime(e.target.value)}
              fullWidth
            />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
          <FormControl fullWidth variant="outlined" required sx={{ mb: 1 }}>
            <InputLabel id="demo-simple-select-label">Kelas</InputLabel>
            <Select
              labelId="kelasLabel"
              id="kelas"
              label="Kelas"
              name="kelas"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
            >
              <MenuItem value={`A`}>A</MenuItem>
              <MenuItem value={`B`}>B</MenuItem>
              <MenuItem value={"semua"}>Semua</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ bgcolor: "main" }}
            disabled={disable}
          >
            Simpan
          </Button>
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default TambahTugas;
