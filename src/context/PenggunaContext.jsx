/* eslint-disable react/prop-types */
import { createContext, useState, useEffect} from "react";
import { Authentication } from "../firebase/auth";
import { readDataAll, readDataSingle } from "../firebase/database";
import { useContext } from "react";

const PenggunaContext = createContext(null);

const PenggunaProvider = ({ children }) => {
    const [ users, setUsers ] = useState([]);
    const [ user, setUser ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getData = Authentication(async (user) => {
            if(user?.uid) {
                const userSingle = await readDataSingle(user?.uid);
                setUser(userSingle); 
                setLoading(false);
            }
        });

        return () => getData;
    }, []);

    useEffect(() => {
        const getData = async () => {
            const userAll = await readDataAll();
            setUsers(userAll);
            setLoading(false);
        }
        
        if(users == 0) getData();
    }, [users]);

    return (
        <PenggunaContext.Provider value={{ user, users, loading }}>
            {children}
        </PenggunaContext.Provider>
    );
}

const Pengguna = () => {
    return useContext(PenggunaContext);
}

export { Pengguna, PenggunaProvider };