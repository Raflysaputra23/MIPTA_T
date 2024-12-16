import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <Fragment>
      <Helmet>
        <meta name="description" content="Halaman Tidak ditemukan" />
        <meta name="keywords" content="Aplikasi MIPA T" />
      </Helmet>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          fontStyle="italic"
          gutterBottom
        >
          404 - Not Found
        </Typography>
      </Box>
    </Fragment>
  );
};

export default NotFound;
