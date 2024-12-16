import {
  Card,
  CardHeader,
  Grid2,
  IconButton,
  InputBase,
  Paper,
  Link,
  CircularProgress,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Scients from "../firebase/Scients";
import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { Authentication } from "../firebase/auth";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const Scient = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await Scients(search, id);
    setLoading(false);
    setResult(response);
  };

  useEffect(() => {
    const unsubscribe = Authentication((user) => {
      if (user && !user?.emailVerified) {
        navigate("/verify");
      } else if (!user) {
        navigate("/login");
      }
      setId(user.uid);
    });
    return () => unsubscribe;
  }, []);

  return (
    <Fragment>
      <Helmet>
        <meta
          name="description"
          content="AI MIPA T untuk mencari sumber apa saja sesuai keyword yang diketikkan"
        />
        <meta name="keywords" content="AI MIPA T, Aplikasi MIPA T" />
      </Helmet>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Cari ilmu"
          inputProps={{ "aria-label": "Cari ilmu" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Stack justifyContent="center" sx={{ mt: 2 }}>
        {loading && <CircularProgress sx={{ mx: "auto" }} size={50} />}
      </Stack>
      <Grid2 container spacing={2} mt={2}>
        {result &&
          result.map((item) => (
            <Grid2 key={item.position} size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
              <Card sx={{ p: 1 }}>
                <CardHeader title={item.title} subheader={item.snippet} />
                <Link
                  href={item.link}
                  target="_blank"
                  sx={{
                    bgcolor: "#eaeaea",
                    width: "100%",
                    display: "inline-block",
                    p: 2,
                    borderRadius: 2,
                    overflow: "auto",
                  }}
                >
                  {item.link}
                </Link>
              </Card>
            </Grid2>
          ))}
      </Grid2>
    </Fragment>
  );
};

export default Scient;
