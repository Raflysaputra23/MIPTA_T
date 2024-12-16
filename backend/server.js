const express = require("express");
const axios = require("axios");
const compression = require("compression");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: "https://mipta-t.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(compression());

app.post("/API/RafAi", async (req, res) => {
    try {
        const { message, session, prompt } = req.body;
        const { data } = await axios(`https://kizhbotz.online/AIchat?message=${message}&sifat=${prompt}&session=${session}&apikey=kizh-api-key`);
        res.status(200).json({ creator: "Rafly", response: data.data.response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/API/Scients", async (req, res) => {
    try {
        const { message, session } = req.body;
        const { data } = await axios("https://www.blackbox.ai/api/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",   
            },
            data: {
                messages : [{
                    role: "user",
                    content: message,
                    id: session
                }]
            }
        })
        res.status(200).json({ creator: "Rafly", response: data.results.organic });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.listen(process.env.PORT || 8000, () => {
    console.log(`Running on port ${process.env.PORT || 8000}`);
});
  