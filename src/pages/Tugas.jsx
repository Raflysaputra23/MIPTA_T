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
  Skeleton,
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
  const currentRef = useRef(null);
  const [waktuHabis, setWaktuHabis] = useState(false);
  
  useEffect(() => {
      currentRef.current = setInterval(() => {
        const target = new Date(deadline).getTime();
        const date = new Date().getTime();
        const difference = target - date;
        const parseWaktu = (waktu) => {
          return waktu > 9 ? waktu : `0${waktu}`;
        };

        if(difference <= 500) {
          setWaktuHabis(true);
          clearInterval(currentRef.current);
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
    return () => clearInterval(currentRef.current);
  }, []);

  if(waktuHabis) {
    return (
      <Typography>
        Waktu Habis
      </Typography>
    )
  }

  return (
    <Stack flexDirection="row" alignContent="center" justifyContent="space-between" sx={{width: "100%"}}>
      <Box  variant="h6" fontSize={16} component="section" display="flex" flexDirection={"column"} alignItems="center">
        <Typography ref={timeDay} variant="h6" fontSize={16} component="section">
          <Skeleton width="2rem" height="1.6rem" />
        </Typography>
        <Typography variant="h6" fontSize={16} component="section" fontWeight="bold">
            Hari
        </Typography>
      </Box>
      :
      <Box variant="h6" fontSize={16} component="section" display="flex" flexDirection={"column"} alignItems="center">
        <Typography ref={timeHour} variant="h6" fontSize={16} component="section">
          <Skeleton width="2rem" height="1.6rem" />
        </Typography>
        <Typography variant="h6" fontSize={16} component="section" fontWeight="bold">
            Jam
        </Typography>
      </Box>
      :
      <Box variant="h6" fontSize={16} component="section" display="flex" flexDirection={"column"} alignItems="center">
        <Typography ref={timeMinute} variant="h6" fontSize={16} component="section">
          <Skeleton width="2rem" height="1.6rem" />
        </Typography>
        <Typography variant="h6" fontSize={16} component="section" fontWeight="bold">
            Menit
        </Typography>
      </Box>
      :
      <Box variant="h6" fontSize={16} component="section" display="flex" flexDirection={"column"} alignItems="center">
        <Typography ref={timeSecond} variant="h6" fontSize={16} component="section">
          <Skeleton width="2rem" height="1.6rem" />
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
  }, []);

  return (
    <Grid2 container justifyContent={{ xs: "center", sm: "start" }} spacing={2}>
      {data.map((item) => (
        <Grid2 key={item.uid} size={{ xs: 11, sm: 4, md: 3 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardHeader title={item.matkul} subheader={(item.kelas.toLowerCase() == "semua") ? "Semua Kelas" : `Kelas ${item.kelas}`} />
            <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Deadline deadline={item.dedline} matkul={item.matkul} />
            </CardContent>
            <CardActions
              sx={{ textAlign: "right", justifyContent: "space-between", alignItems: "center" , px: 2 }}
            >
            <Stack direction="column" alignItems="flex-start">
              <Typography variant="body2" component="p" fontFamily="Tillana, cursive">
                {`From: ${item.createAt}`}
              </Typography>
              <Typography variant="body2" component="p" fontFamily="Tillana, cursive">
                {`Dedline: ${item.dedline}`}
              </Typography>
            </Stack>
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
