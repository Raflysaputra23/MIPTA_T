/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  IconButton,
  Skeleton,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Pengguna } from "../context/PenggunaContext";
import { useState } from "react";
import { Message } from "../context/MessageContext";
import { useEffect } from "react";
import { hapusData } from "../firebase/database";
import { MixinAlert } from "../assets/sweetalert";

const Dashboard = () => {
  const { users, role } = Pengguna();
  const { share, loading } = Message();
  const [acvtiveStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(0);
  }, [share]);

  const handleDeleteShare = async (uid) => {
    try {
      const response = await hapusData("share", uid);
      MixinAlert("success", response);
    } catch(error) {
      MixinAlert("error", error);
    }
  }

  
  const card = [
    {
      title: "Mahasiswa",
      icon: <GroupIcon sx={{ fontSize: 70 }} />,
      jumlah: users.length,
      bgcolor: "main",
    },
    {
      title: "Kelas ILKOM A",
      icon: <PersonIcon sx={{ fontSize: 70 }} />,
      jumlah: users.filter((item) => item.kelas == "ILKOM A").length,
      bgcolor: "#ff0000",
    },
    {
      title: "Kelas ILKOM B",
      icon: <PersonIcon sx={{ fontSize: 70 }} />,
      jumlah: users.filter((item) => item.kelas == "ILKOM B").length,
      bgcolor: "#0000ff",
    },
    {
      title: "Kelas SI",
      icon: <PersonIcon sx={{ fontSize: 70 }} />,
      jumlah: users.filter((item) => item.kelas == "SI").length,
      bgcolor: "#ffff00",
    },
  ];

  return (
    <Fragment>
      <Helmet>
        <meta
          name="description"
          content="Halaman dashboard MIPA T menampilkan jumlah anggota yang login"
        />
        <meta name="keywords" content="Dashboard MIPA T, Aplikasi MIPA T" />
      </Helmet>
      <Stack direction="row" mb={2} bgcolor={"rgba(0, 0, 255, 0.1)"} p={2} borderRadius={2}>
        {loading && <Skeleton width="100%" height={50} />}
        <Stepper activeStep={acvtiveStep} orientation="vertical" sx={{ width: "100%" }}>
          {share && share.map((step, index) => (
            <Step key={step.judul} onClick={() => setActiveStep(index)} sx={{cursor: "pointer"}}>
              <StepLabel icon={<EmailIcon color="primary" />}>
                <Typography variant="body" component="h4" fontWeight="bold">{step.judul}</Typography>
              </StepLabel>
              <StepContent>
                <Stack direction={"row"}>
                  <Box width={"100%"}>
                    <Typography variant="body2" component="p" gutterBottom>{step.deskripsi}</Typography>
                    <Typography variant="body2" fontSize={12} color="text.secondary" mt={2} fontStyle="italic">{step.createAt}</Typography>
                  </Box>
                  {role == "admin" && (
                    <Box>
                      <IconButton color="error" onClick={() => handleDeleteShare(step.uid)}><DeleteIcon /></IconButton>
                    </Box>
                  )}
                </Stack>
              </StepContent>
            </Step>
          ))}
        </Stepper>
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
