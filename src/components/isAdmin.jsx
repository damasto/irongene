import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin({ children }) {

    const { isLoggedIn, isLoading, isAdmin } = useContext(AuthContext);
    console.log("loggedin: ", isLoggedIn)
    // If the authentication is still loading 
    if (isLoading) return <p>Loading ...</p>;

    if (isLoggedIn && isAdmin) {
        // If the user is not logged in AND admin, show content
        return children;
    } else {
        // If the user is logged in, allow to see the page 
        return <Navigate to="/forbidden" />;
    }

}

export default IsAdmin;