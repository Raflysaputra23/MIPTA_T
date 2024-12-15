const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: "https://mipta-t.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedOrigins: ["https://mipta-t.vercel.app"], 
    allowedHeaders: ["Content-Type"],
    credentials: true
  };

app.use(cors(corsOptions));
app.use(express.json());

app.post("/API/RafAi", async (req, res) => {
    try {
        const { message, session, prompt } = req.body;
        const { data } = await axios(`https://kizhbotz.online/AIchat?message=${message}&sifat=${prompt}&session=${session}&apikey=kizh-api-key`);
        res.json({ creator: "Rafly", response: data.data.response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Running on ${port}`);
})