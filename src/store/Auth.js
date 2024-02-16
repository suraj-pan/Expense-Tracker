import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = (props)=>{

    const initailToken = localStorage.getItem("token");
    const initailEmail = localStorage.getItem("email");

    
    const [token,setToken]= useState(initailToken);
    const [email,setEmail]= useState(initailEmail);
    const [loggedIn,setLoggedIn] = useState(false);

    const loginHandler =(email,token)=>{
        console.log(email,token)
        localStorage.setItem("token",token);
        localStorage.setItem("email",email);
        setLoggedIn(true);
        setToken(token);
        setEmail(email);
    }

    const logoutHandler =()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setLoggedIn(false);
        setEmail(null);
        setToken(null)
    }

    const contextValue = {
        token:token,
        email:email,
        loggedIn:loggedIn,
        login:loginHandler,
        logout:logoutHandler,

    }

    return (
        <AuthContext.Provider value={contextValue} >{props.children}</AuthContext.Provider>
    )
}



export {AuthProvider};