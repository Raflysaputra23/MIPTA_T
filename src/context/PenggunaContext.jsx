/* eslint-disable react/prop-types */
import { createContext, useState, useEffect} from "react";
import { Authentication } from "../firebase/auth";
import { Collection, Doc, updateData } from "../firebase/database";
import { useContext } from "react";
import { onSnapshot } from "firebase/firestore";

const PenggunaContext = createContext(null);

const PenggunaProvider = ({ children }) => {
    const [ users, setUsers ] = useState([]);
    const [ user, setUser ] = useState([]);
    const [ banned, setBanned ] = useState([]);
    const [ role, setRole ] = useState("");
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getData = Authentication(async (user) => {
            if(user?.uid) {
                const userRef = Doc("users", user.uid);
                const userSingle = onSnapshot(userRef, (snapshot) => {
                    setUser({ ...snapshot.data()}); 

                    if(snapshot.data().role == "admin") {
                        setRole("admin");
                    } else {
                        setRole("user");
                    }

                    setLoading(false);
                });

                const handleVisibilityChange = async () => {
                    try {
                        if (document.visibilityState === "hidden") {
                            await updateData(user.uid, {status: false});
                        } else if (document.visibilityState === "visible") {
                            await updateData(user.uid, {status: true});
                        }
                    } catch(error) {
                        console.log(error);
                    }
                };
                
                handleVisibilityChange();
                document.addEventListener("visibilitychange", handleVisibilityChange);

                return () => {
                    userSingle();
                    handleVisibilityChange();
                    document.removeEventListener("visibilitychange", handleVisibilityChange);
                };
            }
        });

        return () => getData();
    }, []);

    useEffect(() => {
        (async () => {
            const userRef = Collection("users");
            const userAll = onSnapshot(userRef, (snapshot) => {
                const userList = snapshot.docs.map((user) => ({...user.data()}))
                setUsers(userList);
                setLoading(false);
            });

            return () => userAll();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const userRef = Collection("banned");
            const userAll = onSnapshot(userRef, (snapshot) => {
                const userList = snapshot.docs.map((user) => (user.id));
                setBanned(userList);
                setLoading(false);
            });

            return () => userAll();
        })();
    }, []);

    return (
        <PenggunaContext.Provider value={{ user, users, banned, role, loading }}>
            {children}
        </PenggunaContext.Provider>
    );
}

const Pengguna = () => useContext(PenggunaContext);


export { Pengguna, PenggunaProvider };