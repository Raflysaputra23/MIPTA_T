/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { Fragment } from "react";
import { Authentication } from "../firebase/auth";
import { readDataAll } from "../firebase/database";

const Dashboard = ({ auth }) => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  const [dataUserA, setDataUserA] = useState([]);
  const [dataUserB, setDataUserB] = useState([]);
  const card = [
    {
      title: "Mahasiswa",
      icon: <GroupIcon sx={{ fontSize: 70 }} />,
      jumlah: dataUser.length,
      bgcolor: "main",
    },
    {
      title: "Kelas A",
      icon: <PersonIcon sx={{ fontSize: 70 }} />,
      jumlah: dataUserA.length,
      bgcolor: "#ff0000",
    },
    {
      title: "Kelas B",
      icon: <PersonIcon sx={{ fontSize: 70 }} />,
      jumlah: dataUserB.length,
      bgcolor: "#0000ff",
    },
  ];

  useEffect(() => {
    const unsubscribe = Authentication(async (user) => {
      if (user && !user?.emailVerified) {
        navigate("/verify");
      } else if (!user) {
        navigate("/login");
      }
      const response = await readDataAll();
      const kelasA = response.filter((item) => item.kelas === "A");
      const kelasB = response.filter((item) => item.kelas === "B");
      setDataUserA(kelasA);
      setDataUserB(kelasB);
      setDataUser(response);
    });
    return () => unsubscribe; // Bersihkan listener saat komponen unmounted
  }, []);

  return (
    <Fragment>
      <Stack direction="row" mb={3}>
        <Alert
          variant="filled"
          severity="info"
          sx={{ width: "100%", boxShadow: 3 }}
        >
          <AlertTitle sx={{ fontWeight: "bold" }}>Info</AlertTitle>
          <Typography variant="body2">
            Selamat datang diaplikasi tugas untuk mahasiswa saya membuat
            aplikasi ini dengan sepenuh hati untuk mendata tugas tugas kalian
          </Typography>
        </Alert>
      </Stack>
      <Grid2
        container
        justifyContent={{ xs: "center", sm: "start" }}
        spacing={2}
      >
        {card.map((item) => (
          <Grid2 key={item.title} size={{ xs: 12, sm: 4, md: 3 }}>
            <Card
              sx={{ boxShadow: 3, borderLeft: 15, borderColor: item.bgcolor }}
            >
              <Stack direction="row" alignItems="center">
                <CardContent sx={{ flexBasis: "60%", p: 2, order: 2 }}>
                  <Stack alignItems="start">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="h4"
                      align="center"
                      textAlign={"center"}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body" fontWeight="bold" component="h4">
                      {item.jumlah || <Skeleton width="2rem" height="1.6rem" />}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardMedia
                  sx={{
                    flexBasis: "40%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                    order: 1,
                    color: item.bgcolor,
                  }}
                >
                  {item.icon}
                </CardMedia>
              </Stack>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Fragment>
  );
};

export default Dashboard;
