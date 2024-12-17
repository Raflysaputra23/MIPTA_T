/* eslint-disable react/prop-types */

import { createContext, useState, useEffect, useContext } from "react";
import { Authentication } from "../firebase/auth";
import { readDataAll, readDataSingle } from "../firebase/database";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
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
        <UserContext.Provider value={{ user, users, loading }}>
            {children}
        </UserContext.Provider>
    );
}

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
