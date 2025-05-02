"use client"
import { isUserLoggedIn } from "@/helpers/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        setIsLoggedIn(isUserLoggedIn())
    })

    return (
        <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};