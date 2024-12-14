/* eslint-disable no-extra-boolean-cast */
import SendIcon from '@mui/icons-material/Send';
import RestoreIcon from '@mui/icons-material/Restore';
import { Alert, AlertTitle, Avatar, Box, Card, CardActions, CardContent, CardHeader, CircularProgress, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState, useRef } from 'react';
import { Authentication } from '../server/auth';
import { useNavigate } from 'react-router';
import RafAi from '../server/RafAi';
import { marked } from 'marked';

const Assistant = () => {
  const [ chat, setChat ] = useState([]);
  const [ message, setMessage ] = useState("");
  const [ disabled, setDisabled ] = useState(true);
  const [ session, setSession ] = useState(0);
  const [ loading, setLoading ] = useState(false);
  const messageRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const generateSession = () => {
    return parseInt(Math.random() * 100000);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      setLoading(true);
      const currentChat = [...chat, {message, type: "user"}];
      setChat(currentChat);
      setMessage(""); 

      const response = await RafAi(message, session);
      const newChat = [...currentChat, {message: response, type: "assistant"}];
      setChat(newChat);
      localStorage.setItem("message", JSON.stringify(newChat));
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleResetMessage = () => {
    localStorage.removeItem("message");
    localStorage.setItem("session", generateSession());
    setChat([]);
  }

  const handleInput = (e) => {
    setMessage(e.target.value);
    if(!e.target.value) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat]);

  useEffect(() => {
    const unsubscribe = Authentication((user) => {
      if(user && !user?.emailVerified) {
          navigate("/verify");
      } else if(!user) {
          navigate("/login");
      }
    })

    const message = (localStorage.getItem("message") ? JSON.parse(localStorage.getItem("message")) : []);
    setChat(message);
    if(localStorage.getItem("session")) {
      setSession(localStorage.getItem("session"));
    } else {
      localStorage.setItem("session", generateSession());
      setSession(localStorage.getItem("session"));
    }
    return () => unsubscribe; 
  }, []);


  return (
    <Card ref={contentRef} sx={{ maxWidth: 400, mx: "auto", height: "100%" }}>
      <CardHeader sx={{ bgcolor: "#eaeaea" }} avatar={<Avatar sx={{ bgcolor: "main" }}>M</Avatar>} title="MIPA T" subheader="Bot" action={<IconButton sx={{ color: "#ff0000", borderRadius: 2, '&:hover': { bgcolor: "#ff0000", color: "#fff" }}} onClick={handleResetMessage}><RestoreIcon /></IconButton>} />
      <Stack sx={{ height: "89%" }} direction={"column"} justifyContent={"space-between"}>
        <CardContent sx={{ overflowY: "auto" }}>
        <Alert
            variant="filled"
            severity="info"
            sx={{ width: "100%", boxShadow: 3 }}
          >
            <AlertTitle sx={{ fontWeight: "bold" }}>Info</AlertTitle>
            <Typography variant="body2">
              Bot MIPA T akan membantu menjawab pertanyaan anda
            </Typography>
          </Alert>
          <Stack direction={"column"}>
          {chat && chat.map((chat, index) => (
            <Box key={index} mt={1} sx={{ bgcolor: "main" , overflowX: "auto" , px: 2, borderRadius: 2, maxWidth: "85%", alignSelf: chat.type == "user" ?  "end" : "start" }}>
              <Typography ref={messageRef} variant="body2" color="#fff" dangerouslySetInnerHTML={{ __html: marked.parse(chat.message)}} gutterBottom />
            </Box>
          ))}
          </Stack>
        </CardContent>
        <CardActions sx={{ bgcolor: "#eaeaea", display: "flex" ,justifyContent: "space-between", alignItems: "center", pb: 2 }}>
          <TextField multiline fullWidth variant="outlined" name="message" placeholder='Masukan Pertanyaan' value={message} onChange={handleInput}/>
          <IconButton size="large" sx={{ borderRadius: 2, color: "main", "&:hover": { bgcolor: "main", color: "#fff" }}} disabled={disabled}  onClick={handleSend}>{loading ? <CircularProgress size={30} /> : <SendIcon />}</IconButton>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default Assistant;
