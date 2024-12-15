/* eslint-disable no-async-promise-executor */
import axios from "axios";

const { prompt } = {
    prompt: import.meta.env.VITE_RAF_AI_PROMPT
}

const RafAi = async (message, session) => {
    return new Promise( async (resolve, reject) => {
        try {
            const { data } = await axios(`https://mipta-t.vercel.app/API/RafAi`, {
                timeout: 10000,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    message,
                    session,
                    prompt
                }
            })
            resolve(data.response);
        } catch (error) {
            reject("Maaf Bot MIPA T Sedang Mengalami Gangguan");
        }
    })
}

export default RafAi;