import SendIcon from '@mui/icons-material/Send';
import { Alert, AlertTitle, Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, Stack, TextField, Typography } from "@mui/material";

const Assistant = () => {
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", height: "100%" }}>
      <CardHeader sx={{ bgcolor: "#eaeaea" }} avatar={<Avatar sx={{ bgcolor: "main" }}>M</Avatar>} title="MIPA T" subheader="Bot" />
      <Stack sx={{ height: "89%" }} direction={"column"} justifyContent={"space-between"}>
        <CardContent sx={{ overflowY: "auto" }}>
        <Alert
            variant="filled"
            severity="info"
            sx={{ width: "100%", boxShadow: 3 }}
          >
            <AlertTitle sx={{ fontWeight: "bold" }}>Info</AlertTitle>
            <Typography variant="body2">
              Masih tahap pengembangan Bot belum ngerespon
            </Typography>
          </Alert>
          <Stack direction={"column"}>
            <Box mt={1} sx={{ bgcolor: "main", p: 2, borderRadius: 2, maxWidth: "70%", alignSelf: "end"}}>
              <Typography variant="body2" color="#fff">
                Bot MIPA T akan menjawab pertanyaan anda.
              </Typography>
            </Box>
            <Box mt={1} sx={{ bgcolor: "main", p: 2, borderRadius: 2, maxWidth: "70%", alignSelf: "start"}}>
              <Typography variant="body2" color="#fff">
                Bot MIPA T akan menjawab pertanyaan anda.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActions sx={{ bgcolor: "#eaeaea", display: "flex" ,justifyContent: "space-between", alignItems: "center", pb: 2 }}>
          <TextField multiline fullWidth variant="outlined" placeholder='Masukan Pertanyaan'/>
          <IconButton size="large" sx={{ borderRadius: 2, color: "main", "&:hover": { bgcolor: "main", color: "#fff" }}}><SendIcon /></IconButton>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default Assistant;
