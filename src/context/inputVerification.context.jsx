
import React, { useState, useEffect } from "react";
import api from "../api/axios";

const VerifyInputContext = React.createContext();

function VerifyInputProviderWrapper(props) {
   
    const verifyEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            return false;
        } else {
            return true
        }
    }
    
    const verifyPassword = (password) => {
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)) {
            return
        } else {
            return true
        }
    }

    return (
        <VerifyInputContext.Provider value={{ verifyEmail, verifyPassword}}>
            {props.children}
        </VerifyInputContext.Provider>
    )
}

export { VerifyInputProviderWrapper, VerifyInputContext };
