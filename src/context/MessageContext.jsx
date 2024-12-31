/* eslint-disable react/prop-types */
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react"
import { Collection } from "../firebase/database";
import { useContext } from "react";

const MessageContext = createContext(null);

const MessageProvider = ({children}) => {
    const [message, setMessage] = useState([]);
    const [share, setShare] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const messageRef = Collection("message");
        const q = query(messageRef, orderBy("createAt", "asc"));
        const messageContent = onSnapshot(q, (snapshot) => {
            const message = snapshot.docs.map((message) => ({uid: message.id, ...message.data()}));
            setMessage(message);
            setLoading(false);
        });

        return () => messageContent();
    }, []);

    useEffect(() => {
        const messageRef = Collection("share");
        const q = query(messageRef, orderBy("createAt", "desc"));
        const messageContent = onSnapshot(q, (snapshot) => {
            const message = snapshot.docs.map((message) => ({...message.data()}));
            setShare(message);
            setLoading(false);
        });

        return () => messageContent();
    }, []);

  return (
    <MessageContext.Provider value={{message, share, loading}}>
        {children}
    </MessageContext.Provider>
  )
}

const Message = () => useContext(MessageContext);

export { MessageProvider, Message }

