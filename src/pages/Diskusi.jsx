import { Alert, AlertTitle, Avatar, Box, Card, CardActions, CardContent, CardHeader, CircularProgress, IconButton, Stack, TextField, Typography } from "@mui/material";
import { marked } from "marked";
import { useRef, useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import SendIcon from "@mui/icons-material/Send";
import { Pengguna } from "../context/PenggunaContext";
import { addData } from "../firebase/database";
import { Message } from "../context/MessageContext";

const Diskusi = () => {
    const { user, users } = Pengguna();
    const { message, loading } = Message();
    const [chat, setChat] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [online, setOnline] = useState(0);
    const messageRef = useRef(null);
    const contentRef = useRef(null);

    const handleInput = (e) => {
        setChat(e.target.value);
        if (!e.target.value) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    useEffect(() => {
        setOnline(users.filter((user) => user.status == true).length)
    }, [users]);

    const handleClick = async () => {
        const generateUniqueId = () => {
            return (
              Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
            );
        };
        try {
            await addData({uid: generateUniqueId(), id: user.uid ,username: user.username, message: chat, createAt: new Date().getTime()}, "message");
        } catch(error) {
            console.log(error);
        }
        setChat("");
    }

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [message]);



  return (
    <Fragment>
      <Helmet>
        <meta
          name="description"
          content="Assiten bot MIPA T yang membantu permasalahan mahasiswa"
        />
        <meta
          name="keywords"
          content="Manage Tugas, Aplikasi MIPA T, BOT MIPA T"
        />
      </Helmet>
      <Card ref={contentRef} sx={{ maxWidth: 400, mx: "auto", height: "100%" }}>
        <CardHeader
          sx={{ bgcolor: "#eaeaea" }}
          avatar={<Avatar sx={{ bgcolor: "main" }}>M</Avatar>}
          title="Forum Diskusi"
          subheader="MIPA T"
          action={`${users.length}/${online}`}
        />
        <Stack
          sx={{ height: "89%" }}
          direction={"column"}
          justifyContent={"space-between"}
        >
          <CardContent sx={{ overflowY: "auto" }}>
            <Alert
              variant="filled"
              severity="info"
              sx={{ width: "100%", boxShadow: 3 }}
            >
              <AlertTitle sx={{ fontWeight: "bold" }}>Info</AlertTitle>
              <Typography variant="body2">
                Forum diskusi para anggota MIPA T
              </Typography>
            </Alert>
            <Stack direction={"column"}>
              {loading && <CircularProgress size={50} sx={{ m: "auto", mt: 4 }} />}
              {message &&
                message.map((message, index) => (
                    <Fragment key={index}>

                  <Typography variant="body" textAlign={message.id == user.uid ? "end" : "start"} fontWeight={600} sx={{mt: 1}}>
                        {message.id == user.uid ? "Anda" : message.username}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "main",
                      overflowX: "auto",
                      px: 2,
                      borderRadius: 2,
                      maxWidth: "85%",
                      alignSelf: message.id == user.uid ? "end" : "start",
                    }}
                  >
                    <Typography
                      ref={messageRef}
                      variant="body2"
                      color="#fff"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(message.message),
                      }}
                      gutterBottom
                    />
                  </Box>
                  </Fragment>
                    
                ))}
            </Stack>
          </CardContent>
          <CardActions
            sx={{
              bgcolor: "#eaeaea",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
            }}
          >
            <TextField
              multiline
              fullWidth
              variant="outlined"
              name="chat"
              placeholder="Kirim pesan..."
              value={chat}
              onChange={handleInput}
            />
            <IconButton
              size="large"
              sx={{
                borderRadius: 2,
                color: "main",
                "&:hover": { bgcolor: "main", color: "#fff" },
              }}
              disabled={disabled}
              onClick={handleClick}
            >
              <SendIcon />
            </IconButton>
          </CardActions>
        </Stack>
      </Card>
    </Fragment>
  )
}

export default Diskusi;
