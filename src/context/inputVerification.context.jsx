import React from "react";


const VerifyInputContext = React.createContext();

function VerifyInputProviderWrapper(props) {

    const emailNotValid = "Please provide a valid email";
    const pwdNotValid = "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.";
   
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

    const verifyName = (name) => {
        const nameRegex = /^[\p{L}'\- ]+$/u;
        if(!nameRegex.test(name)) {
            return
        } else {
            return true
        }
    }

    return (
        <VerifyInputContext.Provider value={{ verifyEmail, verifyPassword, verifyName, emailNotValid, pwdNotValid}}>
            {props.children}
        </VerifyInputContext.Provider>
    )
}

export { VerifyInputProviderWrapper, VerifyInputContext };
