/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid2,
  IconButton,
  Menu,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useEffect } from "react";
import { Authentication } from "../firebase/auth";
import { NavLink, useNavigate } from "react-router";
import { hapusData, readDataAll } from "../firebase/database";
import { useRef } from "react";
import { Fragment } from "react";
import { DateTime } from "luxon";
import { MixinAlert } from "../assets/sweetalert";
import { Helmet } from "react-helmet";

const Deadline = ({ deadline, matkul }) => {
  const timeDay = useRef();
  const timeHour = useRef();
  const timeMinute = useRef();
  const timeSecond = useRef();
  const currentRef = useRef(null);
  const [waktuHabis, setWaktuHabis] = useState(false);

  useEffect(() => {
    currentRef.current = setInterval(() => {
      const dateTime = DateTime.fromFormat(deadline, "yyyy-MM-dd HH:mm", {
        zone: "Asia/Jakarta",
      });
      const dedline = dateTime.toMillis();
      const now = DateTime.now().setZone("Asia/Jakarta").toMillis();
      const difference = dedline - now;
      const parseWaktu = (waktu) => {
        return waktu > 9 ? waktu : `0${waktu}`;
      };

      if (difference <= 500) {
        setWaktuHabis(true);
        clearInterval(currentRef.current);
      }

      const days = parseWaktu(Math.floor(difference / (1000 * 60 * 60 * 24)));
      const hours = parseWaktu(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      const minutes = parseWaktu(
        Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      );
      const seconds = parseWaktu(Math.floor((difference % (1000 * 60)) / 1000));

      timeDay.current.innerHTML = days;
      timeHour.current.innerHTML = hours;
      timeMinute.current.innerHTML = minutes;
      timeSecond.current.innerHTML = seconds;
    }, 1000);
    return () => clearInterval(currentRef.current);
  }, []);

  if (waktuHabis) {
    return <Typography>Waktu Habis</Typography>;
  }

  return (
    <Stack
      flexDirection="row"
      alignContent="center"
      justifyContent="space-between"
      sx={{ width: "100%" }}
    >
      <Box
        variant="h6"
        fontSize={16}
        component="section"
        display="flex"
        flexDirection={"column"}
        alignItems="center"
      >
        <Typography
          ref={timeDay}
          variant="h6"
          fontSize={16}
          component="section"
        >
          <Skeleton width="2rem" height="1.6rem" />
        </Typography>
        <Typography
          variant="h6"
          fontSize={16}
          component="section"
          fontWeight="bold"
        >
          Hari
        </Typography>
      </Box>
      :
      <Box
        variant="h6"
        fontSize={16}
        component="section"
        display="flex"
        flexDirection={"column"}
        alignItems="center"
      >
        <Typography
          ref={timeHour}
          variant="h6"
          fontSize={16}
          component="section"
        >
          <Skeleton width="2rem" height="1.6rem" />
        </Typography>
        <Typography
          variant="h6"
          fontSize={16}
          component="section"
          fontWeight="bold"
        >
          Jam
        </Typography>
      </Box>
      :
      <Box
        variant="h6"
        fontSize={16}
        component="section"
        display="flex"
        flexDirection={"column"}
        alignItems="center"
      >
        <Typography
          ref={timeMinute}
          variant="h6"
          fontSize={16}
          component="section"
        >
          <Skeleton width="2rem" height="1.6rem" />
        </Typography>
        <Typography
          variant="h6"
          fontSize={16}
          component="section"
          fontWeight="bold"
        >
          Menit
        </Typography>
      </Box>
      :
      <Box
        variant="h6"
        fontSize={16}
        component="section"
        display="flex"
        flexDirection={"column"}
        alignItems="center"
      >
        <Typography
          ref={timeSecond}
          variant="h6"
          fontSize={16}
          component="section"
        >
          <Skeleton width="2rem" height="1.6rem" />
        </Typography>
        <Typography
          variant="h6"
          fontSize={16}
          component="section"
          fontWeight="bold"
        >
          Detik
        </Typography>
      </Box>
    </Stack>
  );
};

const Tugas = () => {
  const navigate = useNavigate();
  const [expandedIds, setExpandedIds] = useState([]);
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState("");
  const [hapus, setHapus] = useState(false);

  const handleToggleExpand = (id) => {
    setExpandedIds((prevExpanded) =>
      prevExpanded.includes(id)
        ? prevExpanded.filter((itemId) => itemId !== id)
        : [...prevExpanded, id]
    );
  };

  const options = [{ item: <DeleteIcon key={"hapus"} />, type: "hapus" }];

  const handleAnchor = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    setMenu(id);
  };

  const handleMenu = async (type) => {
    if (type == "hapus") {
      try {
        const response = await hapusData("tugas", menu);
        setOpen(false);
        setHapus((action) => !action);
        MixinAlert("success", response);
      } catch (error) {
        MixinAlert("error", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = Authentication((user) => {
      if (user && !user?.emailVerified) {
        navigate("/verify");
      } else if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      const data = await readDataAll("tugas");
      setData(data);
    })();
  }, [hapus]);

  const MenuCard = () => {
    return (
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setOpen((action) => !action)}
        slotProps={{
          paper: {
            style: {
              maxHeight: 48 * 4.5,
              width: "4rem",
              boxShadow: "-1px 1px 4px -1px rgba(0,0,0,0.2)",
            },
          },
        }}
      >
        {options.map((option) => (
          <Stack key={option.type} width={"100%"} px={1}>
            <IconButton
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor:
                    option.type == "hapus" ? "#ff0000" : "#00ff00",
                  color: "#fff",
                },
              }}
              onClick={() => handleMenu(option.type)}
            >
              {option.item}
            </IconButton>
          </Stack>
        ))}
      </Menu>
    );
  };

  return (
    <Fragment>
      <Helmet>
        <meta
          name="description"
          content="Halaman tugas tempat memanage dedline tugas yang telah ditambahkan"
        />
        <meta
          name="keywords"
          content="Dedline tugas mahasiswa, Aplikasi MIPA T"
        />
      </Helmet>
      <Grid2
        container
        justifyContent={{ xs: "center", sm: "start" }}
        spacing={2}
      >
        {data.map((item) => (
          <Grid2 key={item.uid} size={{ xs: 11, sm: 4, md: 3 }}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader
                title={item.matkul}
                subheader={
                  item.kelas.toLowerCase() == "semua"
                    ? "Semua Kelas"
                    : `Kelas ${item.kelas}`
                }
                action={
                  <IconButton
                    onClick={(event) => handleAnchor(event, item.uid)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <MenuCard />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Deadline deadline={item.dedline} matkul={item.matkul} />
              </CardContent>
              <CardActions
                sx={{
                  textAlign: "right",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                }}
              >
                <Stack direction="column" alignItems="flex-start">
                  <Typography
                    variant="body2"
                    component="p"
                    fontFamily="Tillana, cursive"
                  >
                    {`From: ${item.createAt}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    fontFamily="Tillana, cursive"
                  >
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
              <Collapse
                in={expandedIds.includes(item.uid)}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    component="h2"
                    gutterBottom
                  >
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
    </Fragment>
  );
};

export default Tugas;
