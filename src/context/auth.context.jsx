// src/context/auth.context.jsx

import React, { useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)

  /* 
    Functions for handling the authentication status (isLoggedIn, isLoading, user)
    will be added here later in the next step
  */

    const storeToken = (token) => {       //  <==  ADD
        localStorage.setItem('authToken', token);
        console.log(token)
      };

      const getToken = () => {       //  <==  ADD
        localStorage.getItem('authToken');
      };

      

      const authenticateUser = () => {           //  <==  ADD  
        // Get the stored token from the localStorage
        const storedToken = localStorage.getItem('authToken');
        
        // If the token exists in the localStorage
        if (storedToken) {
          // We must send the JWT token in the request's "Authorization" Headers
          api.get(
            `/auth/verify`, 
            { headers: { Authorization: `Bearer ${storedToken}`} }
          )
          .then((response) => {
            // If the server verifies that the JWT token is valid  
            const user = response.data;
           // Update state variables        
            setIsLoggedIn(true);
            setIsLoading(false);
            setIsAdmin(user.role === "admin")
            setUser(user);   
          })
          .catch((error) => {
            // If the server sends an error response (invalid token) 
            // Update state variables         
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null); 
            
          });      
        } else {
          // If the token is not available (or is removed)
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
            setIsAdmin(false)      
        }   
      }

      const removeToken = () => {                    // <== ADD
        // Upon logout, remove the token from the localStorage
        localStorage.removeItem("authToken");
      }
     
     
      const logOutUser = () => {                   // <== ADD    
        // To log out the user, remove the token
        removeToken();
        // and update the state variables    
        authenticateUser();
      }  

      useEffect(() => {                                    
        authenticateUser();                
       }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken,getToken, authenticateUser, logOutUser, removeToken, isAdmin }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };
