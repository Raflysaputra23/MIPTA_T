/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useUser } from "../context/userContext";

const Dashboard = () => {
  const { users } = useUser();

  const card = [
    {
      title: "Mahasiswa",
      icon: <GroupIcon sx={{ fontSize: 70 }} />,
      jumlah: users.length,
      bgcolor: "main",
    },
    {
      title: "Kelas A",
      icon: <PersonIcon sx={{ fontSize: 70 }} />,
      jumlah: users.filter(item => item.kelas == 'A').length,
      bgcolor: "#ff0000",
    },
    {
      title: "Kelas B",
      icon: <PersonIcon sx={{ fontSize: 70 }} />,
      jumlah: users.filter(item => item.kelas == 'B').length,
      bgcolor: "#0000ff",
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
