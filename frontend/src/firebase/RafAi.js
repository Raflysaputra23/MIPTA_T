/* eslint-disable no-async-promise-executor */
import axios from "axios";

const { prompt } = {
    prompt: import.meta.env.VITE_RAF_AI_PROMPT
}

const RafAi = async (message, session) => {
    return new Promise( async (resolve, reject) => {
        try {
            const { data } = await axios(`http://localhost:8000/API/RafAi`, {
                method: "POST",
                data: {
                    message,
                    session,
                    prompt
                }
            })
            resolve(data.response);
        } catch (error) {
            reject(error);
        }
    })
}

export default RafAi;