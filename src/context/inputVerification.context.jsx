
import React, { useState, useEffect } from "react";
import api from "../api/axios";

const VerifyInputContext = React.createContext();

function VerifyInputProviderWrapper(props) {
   
    const verifyEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            console.error({ message: "Provide a valid email address." });
            return;
        } else {
            return true
        }
    }
    
    const verifyPassword = (password) => {
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)) {
            console.error({
                message:
                    "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
            });
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
