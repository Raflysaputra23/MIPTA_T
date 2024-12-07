/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useEffect } from "react";
import { Authentication } from "../server/auth";
import { NavLink, useNavigate } from "react-router";
import { readDataAll } from "../server/database";
import { useRef } from "react";
import { Fragment } from "react";

const Deadline = ({deadline, matkul}) => {
  const timeDay = useRef();
  const timeHour = useRef();
  const timeMinute = useRef();
  const timeSecond = useRef();
  let hasNotifiedDayBefore = false;
  let hasNotifiedTwoHoursBefore = false;

  const sendNotifikasi = (title, body) => {
    new Notification(title, { body, icon: '/path/to/icon.png' });
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      const parseWaktu = (waktu) => {
        return waktu > 9 ? waktu : `0${waktu}`;
      };
      
      const target = new Date(deadline).getTime();
      const date = new Date().getTime();
      const difference = target - date;
      
      if(difference < 0) {
        clearInterval(interval);
        if( difference == -1) sendNotifikasi(`Deadline ${matkul}`, "Deadline tugas telah berakhir");
      } else if(!hasNotifiedDayBefore && difference <= 86400 && difference > 86000) {
        sendNotifikasi(`Deadline ${matkul}`, "Deadline tugas akan segera berakhir");
        hasNotifiedDayBefore = true;
      } else if(!hasNotifiedTwoHoursBefore && difference <= 7200 && difference > 7100) {
        sendNotifikasi(`Deadline ${matkul}`, "Deadline tugas akan berakhir 1 hari lagi");
        hasNotifiedTwoHoursBefore = true;
      }
      
      const days = parseWaktu(Math.floor(difference / (1000 * 60 * 60 * 24)));
      const hours = parseWaktu(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const minutes = parseWaktu(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
      const seconds = parseWaktu(Math.floor((difference % (1000 * 60)) / 1000));
      
      timeDay.current.innerHTML = days;
      timeHour.current.innerHTML = hours;
      timeMinute.current.innerHTML = minutes;
      timeSecond.current.innerHTML = seconds; 
    }, 1000);
    return () => clearInterval(interval);
  })

  return (
    <Stack flexDirection="row" alignContent="center" justifyContent="space-between" sx={{width: "100%"}}>
      <Box  variant="h6" fontSize={16} component="section" display="flex" flexDirection={"column"} alignItems="center">
        <Typography ref={timeDay} variant="h6" fontSize={16} component="section">
            00
        </Typography>
        <Typography variant="h6" fontSize={16} component="section" fontWeight="bold">
            Hari
        </Typography>
      </Box>
      :
      <Box variant="h6" fontSize={16} component="section" display="flex" flexDirection={"column"} alignItems="center">
        <Typography ref={timeHour} variant="h6" fontSize={16} component="section">
            00
        </Typography>
        <Typography variant="h6" fontSize={16} component="section" fontWeight="bold">
            Jam
        </Typography>
      </Box>
      :
      <Box variant="h6" fontSize={16} component="section" display="flex" flexDirection={"column"} alignItems="center">
        <Typography ref={timeMinute} variant="h6" fontSize={16} component="section">
            00
        </Typography>
        <Typography variant="h6" fontSize={16} component="section" fontWeight="bold">
            Menit
        </Typography>
      </Box>
      :
      <Box variant="h6" fontSize={16} component="section" display="flex" flexDirection={"column"} alignItems="center">
        <Typography ref={timeSecond} variant="h6" fontSize={16} component="section">
            00
        </Typography>
        <Typography variant="h6" fontSize={16} component="section" fontWeight="bold">
            Detik
        </Typography>
      </Box>
    </Stack>
  )
}

const Tugas = () => {
  const navigate = useNavigate();
  const [expandedIds, setExpandedIds] = useState([]);
  const [data, setData] = useState([]);

  const handleToggleExpand = (id) => {
    setExpandedIds((prevExpanded) =>
      prevExpanded.includes(id)
        ? prevExpanded.filter((itemId) => itemId !== id) 
        : [...prevExpanded, id] 
    );
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const unsubscribe = Authentication((user) => {
      if(user && !user?.emailVerified) {
          navigate("/verify");
      } else if(!user) {
          navigate("/login");
      }
    })
    return () => unsubscribe; // Bersihkan listener saat komponen unmounted
  }, []);

  useEffect(() => {
    (async () => {
      const data = await readDataAll("tugas");
      setData(data);
    })()
  }, [])

  return (
    <Grid2 container justifyContent={{ xs: "center", sm: "start" }} spacing={2}>
      {data.map((item) => (
        <Grid2 key={item.uid} size={{ xs: 11, sm: 4, md: 3 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardHeader title={item.matkul} subheader={(item.kelas.toLowerCase() == "semua") ? "Semua Kelas" : `Kelas ${item.kelas}`} />
            <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Deadline deadline={item.deadline} matkul={item.matkul} />
            </CardContent>
            <CardActions
              sx={{ textAlign: "right", justifyContent: "space-between", alignItems: "center" , px: 2 }}
            >
              <Typography variant="body2" component="p" fontFamily="Tillana, cursive">
                {`${item.createAt} -> ${item.deadline}`}
              </Typography>
              <IconButton
                onClick={() => handleToggleExpand(item.uid)}
                aria-expanded={expandedIds.includes(item.uid)}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expandedIds.includes(item.uid)} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" component="h2" gutterBottom>
                  Deskripsi
                </Typography>
                <Typography variant="body2" component="p">
                  {item.deskripsi}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid2>
      ))}
      <Grid2 size={{ xs: 11, sm: 4, md: 3 }}>
        <Card sx={{ boxShadow: 3, display: "flex", p: 2 }}>
          <IconButton
            component={NavLink}
            to="/tugas/tambah-tugas"
            size="large"
            sx={{
              m: "auto",
              color: "#fff",
              bgcolor: "main",
              "&:hover": { bgcolor: "#fff", color: "main" },
            }} 
          >
            <AddIcon />
          </IconButton>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default Tugas;
