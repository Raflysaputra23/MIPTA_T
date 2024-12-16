/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
import axios from "axios";


const Scients = async (message, session) => {
    return new Promise( async (resolve, reject) => {
        try {
            const { data } = await axios(`https://mipta-t.vercel.app/API/Scients`, {
                timeout: 10000,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    message,
                    session
                }
            })
            resolve(data.response);
        } catch (error) {
            reject("Maaf Bot MIPA T Sedang Mengalami Gangguan");
        }
    })
}

export default Scients;