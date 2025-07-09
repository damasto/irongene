import React, { useEffect } from "react";
import { useState } from "react";


const FormDataContext = React.createContext();

function FormDataProviderWrapper(props) {
   
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        console.log("formData: ", formData)
    }, [formData])
    return (
        <FormDataContext.Provider value={{ formData, setErrorMessage, errorMessage, handleChange, setFormData}}>
            {props.children}
        </FormDataContext.Provider>
    )
}

export { FormDataProviderWrapper, FormDataContext };
