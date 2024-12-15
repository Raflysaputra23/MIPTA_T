import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
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
  );
};

export default NotFound;
